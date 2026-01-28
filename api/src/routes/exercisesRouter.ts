import { Router } from 'express';
import { getExercises } from "../controllers/exercisesController.js";

const router = Router();
router.get('/', getExercises)

export default router;