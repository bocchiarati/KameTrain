import { Router } from 'express';
import {getMuscleGroup} from "../controllers/muscleGroupController.js";

const router = Router();
router.get('/', getMuscleGroup)

export default router;