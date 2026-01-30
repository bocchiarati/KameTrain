import type {Request, Response} from 'express';
import {muscleGroupService} from "../services/muscleGroupService.js";
import {exercisesService} from "../services/exercisesService.js";

export const muscleGroupController = {
    getMuscleGroups: async (req: Request, res: Response) => {
        try {
            const muscleGroups = await muscleGroupService.getAllMuscleGroup();
            return res.json(muscleGroups);
        } catch (error) {
            return res.status(500).json({error: error});
        }
    },
    getMuscleGroup: async(req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const muscleGroup = await muscleGroupService.getMuscleGroupById(id as string);
            if (!muscleGroup) {
                return res.status(404).json({ error: 'Muscle Group not found' });
            }
            return res.json(muscleGroup);
        } catch (error) {
            return res.status(500).json({ error : error });
        }
    },

    createMuscleGroup: async(req: Request, res: Response) => {
        const data = req.body;
        try {
            if(!data.libelle){
                return res.status(401).json({error : 'Param missing'})
            }
            const muscleGroup = await muscleGroupService.newMuscleGroup(data.libelle)
            if(!muscleGroup) {
                return res.status(401).json({ error: 'Exercise not created'})
            }
            return res.status(200).json(muscleGroup)
        } catch (error) {
            return res.status(500).json({ error : error })
        }
    }
}