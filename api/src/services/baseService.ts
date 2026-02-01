import {BaseRepository} from "../repositories/baseRepository.js";

export class BaseService<T> {
    protected repository: BaseRepository<T>;
    constructor(protected modelName: string) {
        this.repository = new BaseRepository<T>(modelName)
    }

    async getAll (): Promise<T[]> {
        return await this.repository.findAll()
    }

    async getById (id: string): Promise<T | null> {
        return await this.repository.findById(id)
    }

    async new (data: Partial<T>): Promise<T | null> {
        return await this.repository.create(data)
    }
    async edit(id: string, data: Partial<T>): Promise<T | null> {
        return await this.repository.update(id, data)
    }

    async delete(id: string): Promise<T | null> {
        return await this.repository.delete(id)
    }
}