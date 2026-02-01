import express from 'express';
import muscleGroupRouter from "./routes/muscleGroupRouter.js";
import exercisesRouter from "./routes/exercisesRouter.js";
import {BaseRouter} from "./routes/baseRouter.js";
import type {Exercise} from "./models/Exercise.js";
import type {MuscleGroup} from "./models/MuscleGroup.js";

const app = express();
const PORT = 3000;

app.use(express.json())
app.get('/', (req: any, res: { json: (arg0: { message: string; }) => void; }) => {
    res.json({ message: "L'API de ton app de sport est prête !" });
});

app.use("/muscleGroups", muscleGroupRouter);
app.use("/exercises", exercisesRouter);
app.use("/exercises", new BaseRouter<Exercise>("exercise").router);
app.use("/muscle-groups", new BaseRouter<MuscleGroup>("muscle_group").router);

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});