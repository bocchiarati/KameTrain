import {Router} from 'express';
import {exercisesController} from "../controllers/exercisesController.js";

const router = Router();
router.get('/', exercisesController.getExercises)
router.get('/:id', exercisesController.getExercise)

router.post('/', exercisesController.createExercise)
// router.patch('/:id')
// router.delete('/:id')
export default router;