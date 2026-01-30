import type {Exercise} from "../models/Exercise.js";
import {BaseRepository} from "./baseRepository.js";

class ExercisesRepository extends BaseRepository<Exercise> {
    constructor() {
        super("exercise"); // Nom de ta table en base de données
    }
}

export const exercisesRepository = new ExercisesRepository();