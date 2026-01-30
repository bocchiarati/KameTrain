import {BaseRepository} from "./baseRepository.js";
import type {MuscleGroup} from "../models/MuscleGroup.js";

class MuscleGroupRepository extends BaseRepository<MuscleGroup> {
    constructor() {
        super("muscle_group"); // Nom de ta table en base de données
    }
}

export const muscleGroupRepository = new MuscleGroupRepository();