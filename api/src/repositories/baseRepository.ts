import pool from "../db.js"
import type {ResultSetHeader} from "mysql2";
import { v4 as uuid } from 'uuid';

export abstract class BaseRepository<T> {
    protected constructor(protected tableName: string) {}

    async findAll(): Promise<T[]> {
        const [rows] = await pool.query<any>(
            `SELECT * FROM ${this.tableName}`
        );
        return rows as T[];
    }

    async findById(id: string): Promise<T | null> {
        const [rows]: any = await pool.query(
            `SELECT * FROM ${this.tableName} WHERE id = UUID_TO_BIN(?)`,
            [id]
        );
        return rows[0] || null;
    }

    async create (data: Partial<T>): Promise<T | null> {
        const newId = uuid();
        const columns = ['id', ...Object.keys(data)];

        const placeholders = columns.map(col => {
            if (col === 'id' || col.endsWith('_id')) {
                return 'UUID_TO_BIN(?)';
            }
            return '?';
        });

        const values = [newId, ...Object.values(data)];

        const sql = `
            INSERT INTO ${this.tableName} (${columns.join(', ')}) 
            VALUES (${placeholders.join(', ')})
        `;

        await pool.query<ResultSetHeader>(sql, values);
        return this.findById(newId);
    }
}