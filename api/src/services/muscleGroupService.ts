import {BaseService} from "./baseService.js";
import {muscleGroupRepository} from "../repositories/muscleGroupRepository.js";
import type {MuscleGroup} from "../models/MuscleGroup.js";

class MuscleGroupService extends BaseService<MuscleGroup> {
    constructor() {
        super(muscleGroupRepository);
    }
}

export const muscleGroupService = new MuscleGroupService();