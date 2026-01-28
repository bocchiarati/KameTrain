import {exercisesService} from "../services/exercisesService.js";

export const getExercises = async (req: Request, res: Response) => {
    try {
        const exercises = await exercisesService.getAllExercises();
        return res.json(exercises);
    } catch (error) {
        return res.status(500).json({ error : error });
    }
}