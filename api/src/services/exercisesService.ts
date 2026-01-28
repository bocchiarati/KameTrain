import type {Exercise} from "../models/Exercise.js";
import {exercisesRepository} from "../repositories/exercisesRepository.js";

export const exercisesService = {
    getAllExercises: async (): Promise<Exercise[]> => {
        return await exercisesRepository.findAll() as Exercise[]
    }
}