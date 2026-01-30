import { BaseRouter } from './baseRouter.js';
import type { MuscleGroup } from '../models/MuscleGroup.js';
import { muscleGroupController } from '../controllers/muscleGroupController.js';

class MuscleGroupRouter extends BaseRouter<MuscleGroup> {
    constructor() {
        super(muscleGroupController);
    }
}

export default new MuscleGroupRouter().router;