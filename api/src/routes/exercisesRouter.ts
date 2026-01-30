import { BaseRouter } from './baseRouter.js';
import type {Exercise} from '../models/Exercise.js';
import { exercisesController } from '../controllers/exercisesController.js';

class ExerciseRouter extends BaseRouter<Exercise> {
    constructor() {
        super(exercisesController);
    }
}

export default new ExerciseRouter().router;