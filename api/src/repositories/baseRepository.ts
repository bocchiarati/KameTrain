import pool from "../db.js"
import type {ResultSetHeader} from "mysql2";
import {stringify, v4 as uuid} from 'uuid';

export abstract class BaseRepository<T> {
    protected constructor(protected tableName: string) {}

    async findById(id: string): Promise<T | null> {
        const [rows] = await pool.query<any>(
            `SELECT * FROM ${this.tableName} WHERE id = UUID_TO_BIN(?)`,
            [id]
        );

        // On formate la première ligne si elle existe
        return rows[0] ? this.formatResult(rows[0]) : null;
    }

    async findAll(): Promise<T[]> {
        const [rows] = await pool.query<any>(`SELECT * FROM ${this.tableName}`);

        // On formate chaque ligne du tableau
        return rows.map((row: any) => this.formatResult(row));
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

    public async update(id: string, data: Partial<T>): Promise<T | null> {
        // 1. On récupère les colonnes à modifier
        const columns = Object.keys(data);

        // Si l'objet data est vide, on s'arrête là
        if (columns.length === 0) return this.findById(id);

        // 2. On construit la chaîne "colonne = ?"
        // En gérant le UUID_TO_BIN si nécessaire
        const setClause = columns.map(col => {
            if (col.endsWith('_id')) {
                return `${col} = UUID_TO_BIN(?)`;
            }
            return `${col} = ?`;
        }).join(', ');

        // 3. On prépare les valeurs (les données + l'ID pour le WHERE à la fin)
        const values = [...Object.values(data), id];

        // 4. On assemble la requête
        // Note : On utilise UUID_TO_BIN(?) dans le WHERE pour la performance (index)
        const sql = `
        UPDATE ${this.tableName} 
        SET ${setClause} 
        WHERE id = UUID_TO_BIN(?)
    `;

        await pool.query(sql, values);

        // 5. On retourne l'objet mis à jour
        return this.findById(id);
    }

    private formatResult(row: any): T {
        if (!row) return row;

        // On boucle sur toutes les colonnes du résultat
        for (const key in row) {
            // Si la valeur est un Buffer (ce que MySQL renvoie pour le binaire)
            if (Buffer.isBuffer(row[key]) && row[key].length === 16) {
                // On le transforme en string UUID lisible
                row[key] = stringify(row[key]);
            }
        }
        return row as T;
    }
}