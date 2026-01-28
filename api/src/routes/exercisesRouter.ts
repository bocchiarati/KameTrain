import {Router} from 'express';
import {exercisesController} from "../controllers/exercisesController.js";

const router = Router();
router.get('/', exercisesController.getExercises)
router.get('/:id', exercisesController.getExercise)

export default router;