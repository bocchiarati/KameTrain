import type {Exercise} from "../models/Exercise.js";
import {BaseRepository} from "./baseRepository.js";

class MuscleGroupRepository extends BaseRepository<Exercise> {
    constructor() {
        super("muscle_group"); // Nom de ta table en base de données
    }
}

export const muscleGroupRepository = new MuscleGroupRepository();