import { Router } from 'express';
import {muscleGroupController} from "../controllers/muscleGroupController.js";

const router = Router();

// GET
router.get('/', muscleGroupController.getMuscleGroups) // Retourne tout les group
router.get('/:id', muscleGroupController.getMuscleGroup)
router.post('/', muscleGroupController.createMuscleGroup)
export default router;