import type {Request, Response} from 'express';
import {BaseService} from "../services/baseService.js";

export abstract class BaseController<T> {
    protected constructor(protected service: BaseService<T>) {}

    // Utilise des fonctions fléchées ici
    getAll = async (req: Request, res: Response) => {
        try {
            const entities = await this.service.getAll();
            return res.status(200).json(entities);
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const entity = await this.service.getById(id as string);
            if (!entity) return res.status(404).json({ error: 'Not found' });
            return res.status(200).json(entity);
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    create = async (req: Request, res: Response) => {
        try {
            // Correction du data.body -> req.body
            const entity = await this.service.new(req.body);
            if(!entity) return res.status(400).json({ error: 'Not created'});
            return res.status(201).json(entity);
        } catch (error) {
            return res.status(500).json({ error });
        }
    }
}