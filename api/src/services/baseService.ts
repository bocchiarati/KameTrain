import type {BaseRepository} from "../repositories/baseRepository.js";

export abstract class BaseService<T> {
    protected constructor(protected repository: BaseRepository<T>) {}

    async getAll (): Promise<T[]> {
        return await this.repository.findAll()
    }

    async getById (id: string): Promise<T | null> {
        return await this.repository.findById(id)
    }

    async new (data: Partial<T>): Promise<T | null> {
        return await this.repository.create(data)
    }
}