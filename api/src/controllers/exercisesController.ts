import type {Request, Response} from 'express';
import {exercisesService} from "../services/exercisesService.js";

export const exercisesController = {
    getExercises : async (req: Request, res: Response) => {
        try {
            const exercises = await exercisesService.getAllExercises();
            return res.status(200).json(exercises);
        } catch (error) {
            return res.status(500).json({ error : error });
        }
    },
    getExercise : async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const exercise = await exercisesService.getExerciseById(id as string);
            if (!exercise) {
                return res.status(404).json({ error: 'Exercise not found' });
            }
            return res.json(exercise);
        } catch (error) {
            return res.status(500).json({ error : error });
        }
    }
};
