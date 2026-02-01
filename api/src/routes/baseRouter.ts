import { Router } from 'express';
import { BaseController } from '../controllers/baseController.js';

export class BaseRouter<T> {
    public router: Router;

    constructor(protected modelName: string, protected controller: BaseController<T> = new BaseController<T>(modelName)) {
        this.router = Router();
        this.initRoutes();
    }

    protected initRoutes() {
        // .bind(this.controller) est indispensable pour ne pas perdre le "this"
        this.router.get('/', this.controller.getAll.bind(this.controller));
        this.router.get('/:id', this.controller.getById.bind(this.controller));
        this.router.post('/', this.controller.create.bind(this.controller));
        this.router.patch('/:id', this.controller.edit.bind(this.controller));
        this.router.delete('/:id', this.controller.delete.bind(this.controller));
    }
}