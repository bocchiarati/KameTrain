import pool from "../db.js"
import type {RowDataPacket} from "mysql2";
import { v4 as uuid } from 'uuid';

export const exercisesRepository = {
    // Récupérer tous les programmes
    findAll: async (): Promise<RowDataPacket[]> => {
        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT BIN_TO_UUID(id) as id, name, BIN_TO_UUID(muscle_group_id) as muscle_group_id FROM exercise'
        );
        return rows;
    },

    // Récupérer par ID
    findById: async (id: string): Promise<RowDataPacket | null> => {
        const [rows]: any = await pool.query(
            'SELECT BIN_TO_UUID(id) as id, name, BIN_TO_UUID(muscle_group_id) as muscle_group_id FROM exercise WHERE id = UUID_TO_BIN(?)',
            [id]
        );
        return rows[0] || null;
    },

    create: async (name: string, muscle_group_id: string): Promise<RowDataPacket | null> => {
        const newId = uuid();

        await pool.query(
            'INSERT INTO exercise (id, name, muscle_group_id) VALUES (UUID_TO_BIN(?), ?, UUID_TO_BIN(?))',
            [newId, name, muscle_group_id]
        );

        // On appelle la méthode du repository pour éviter la duplication
        return exercisesRepository.findById(newId);
    }
};