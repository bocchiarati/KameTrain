import type {MuscleGroup} from "../models/MuscleGroup.js";
import {muscleGroupRepository} from "../repositories/muscleGroupRepository.js";

export const muscleGroupService = {
    getAllMuscleGroup: async (): Promise<MuscleGroup[]> => {
        return await muscleGroupRepository.findAll() as MuscleGroup[]
    },
    getMuscleGroupById: async (id: string): Promise<MuscleGroup | null> => {
        return await muscleGroupRepository.findById(id) as MuscleGroup | null
    }
}