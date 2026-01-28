import {muscleGroupService} from "../services/muscleGroupService.js";

export const getMuscleGroup = async (req: Request, res: Response) => {
    try {
        const muscleGroups = await muscleGroupService.getAllMuscleGroup();
        return res.json(muscleGroups);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}