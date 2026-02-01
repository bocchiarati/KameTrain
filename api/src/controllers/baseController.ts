import type {Request, Response} from 'express';
import {BaseService} from "../services/baseService.js";

export class BaseController<T> {
    constructor(modelName: string, protected service: BaseService<T> = new BaseService(modelName)) {}

    // Utilise des fonctions fléchées ici
    getAll = async (req: Request, res: Response) => {
        try {
            const entities = await this.service.getAll();
            return res.status(200).json(entities);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const entity = await this.service.getById(id as string);
            if (!entity) return res.status(404).json({ error: 'Not found' });
            return res.status(200).json(entity);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    create = async (req: Request, res: Response) => {
        try {
            const entity = await this.service.new(req.body);
            if(!entity) return res.status(400).json({ error: 'Not created'});
            return res.status(201).json(entity);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    edit = async (req: Request, res: Response) => {
        try {
            const {id} = req.params
            const entity = await this.service.edit(id as string, req.body)
            if (!entity) return res.status(400).json({error: 'Not update'})
            return res.status(201).json(entity);
        } catch (error) {
            return res.status(500).json({ error: error })
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const {id} = req.params
            const entity = await this.service.delete(id as string)
            if (!entity) return res.status(400).json({error: "Nothing to delete"})
            return res.status(201).json({ message: "This entity has been deleted : ", entity: entity})
        } catch (error) {
            return res.status(500).json({ error: error })
        }
    }
}