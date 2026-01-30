import type {MuscleGroup} from "../models/MuscleGroup.js";
import {muscleGroupRepository} from "../repositories/muscleGroupRepository.js";
import type {Exercise} from "../models/Exercise.js";
import {exercisesRepository} from "../repositories/exercisesRepository.js";

export const muscleGroupService = {
    getAllMuscleGroup: async (): Promise<MuscleGroup[]> => {
        return await muscleGroupRepository.findAll()
    },
    getMuscleGroupById: async (id: string): Promise<MuscleGroup | null> => {
        return await muscleGroupRepository.findById(id)
    },
    newMuscleGroup: async (libelle: string): Promise<MuscleGroup | null> => {
        return await muscleGroupRepository.create({
            libelle
        })
    }
}