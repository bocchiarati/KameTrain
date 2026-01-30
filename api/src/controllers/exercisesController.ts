import type {Exercise} from "../models/Exercise.js";
import {BaseController} from "./baseController.js";
import {exercisesService} from "../services/exercisesService.js";

class ExerciseController extends BaseController<Exercise> {
    constructor() {
        super(exercisesService);
    }
}

export const exercisesController = new ExerciseController();