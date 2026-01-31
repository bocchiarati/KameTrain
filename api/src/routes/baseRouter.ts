import { Router } from 'express';
import { BaseController } from '../controllers/baseController.js';

export abstract class BaseRouter<T> {
    public router: Router;

    protected constructor(protected controller: BaseController<T>) {
        this.router = Router();
        this.initRoutes();
    }

    // On définit les routes CRUD standards
    protected initRoutes() {
        this.router.get('/', this.controller.getAll);
        this.router.get('/:id', this.controller.getById);
        this.router.post('/', this.controller.create);
        this.router.patch('/:id', this.controller.edit);
    }
}