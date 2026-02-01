import { PrismaClient } from '../generated/prisma/index.js';
import { uuidUtils } from '../utils/uuid.js';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { v4 as uuidv4, parse as uuidParse } from 'uuid';

const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABASE!,
    connectionLimit: 5
});
const prisma = new PrismaClient({ adapter });

export { prisma }

export class BaseRepository<T> {
    constructor(protected modelName: string) {}

    protected get db() {
        return (prisma as any)[this.modelName];
    }

    // --- LECTURE ---

    async findById(id: string): Promise<T | null> {
        const item = await this.db.findUnique({
            where: { id: uuidUtils.toBin(id) }
        });
        return item ? this.formatOutput(item) : null;
    }

    async findAll(): Promise<T[]> {
        const items = await this.db.findMany();
        return items.map((item: any) => this.formatOutput(item));
    }

    // --- ÉCRITURE ---

    async create(data: Partial<T>): Promise<T> {
        const formattedData = this.formatInput(data);

        if (!formattedData.id) {
            // uuidv4() génère la string, uuidParse() la transforme en Uint8Array (Buffer)
            formattedData.id = Buffer.from(uuidParse(uuidv4()));
        }
        if ('created_at' in data && typeof data.created_at === 'string') {
            data.created_at = new Date(data.created_at);
        }
        const item = await this.db.create({
            data: formattedData
        });
        return this.formatOutput(item);
    }

    async update(id: string, data: Partial<T>): Promise<T> {
        const item = await this.db.update({
            where: { id: uuidUtils.toBin(id) },
            data: this.formatInput(data)
        });
        return this.formatOutput(item);
    }

    async delete(id: string): Promise<T | null> {
        const item = await this.findById(id);
        if (item) {
            await this.db.delete({
                where: { id: uuidUtils.toBin(id) }
            });
        }
        return item;
    }

    // --- MAPPING (La tuyauterie) ---

    // String -> Buffer (pour Prisma/MariaDB)
    protected formatInput(data: any): any {
        const formatted = { ...data };
        for (const key in formatted) {
            if ((key === 'id' || key.endsWith('_id')) && typeof formatted[key] === 'string') {
                formatted[key] = uuidUtils.toBin(formatted[key]);
            }
        }
        return formatted;
    }

    // Buffer -> String (pour ton code TS/Frontend)
    protected formatOutput(data: any): T {
        const formatted = { ...data };
        for (const key in formatted) {
            const value = formatted[key];
            // Vérifie si c'est un Buffer, un Uint8Array ou un objet de bytes Prisma
            if (value instanceof Uint8Array) {
                formatted[key] = uuidUtils.toStr(Buffer.from(value));
            }
        }
        return formatted as T;
    }
}