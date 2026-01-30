import type {Exercise} from "../models/Exercise.js";
import {BaseService} from "./baseService.js";
import {exercisesRepository} from "../repositories/exercisesRepository.js";

class ExercisesService extends BaseService<Exercise> {
    constructor() {
        super(exercisesRepository);
    }
}

export const exercisesService = new ExercisesService();