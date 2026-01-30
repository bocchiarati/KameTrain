import type {MuscleGroup} from "../models/MuscleGroup.js";
import {BaseController} from "./baseController.js";
import {muscleGroupService} from "../services/muscleGroupService.js";

class MuscleGroupController extends BaseController<MuscleGroup> {
    constructor() {
        super(muscleGroupService);
    }
}

export const muscleGroupController = new MuscleGroupController();