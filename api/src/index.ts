import express from 'express';
import {BaseRouter} from "./routes/baseRouter.js";
import type {Exercise} from "./models/Exercise.js";
import type {MuscleGroup} from "./models/MuscleGroup.js";
import type {Programm} from "./models/Programm.js";
import type {User} from "./models/User.js";

const app = express();
const PORT = 3000;

app.use(express.json())
app.get('/', (req: any, res: { json: (arg0: { message: string; }) => void; }) => {
    res.json({ message: "L'API de ton app de sport est prête !" });
});

app.use("/exercises", new BaseRouter<Exercise>("exercise").router);
app.use("/muscle-groups", new BaseRouter<MuscleGroup>("muscle_group").router);
app.use("/programms", new BaseRouter<Programm>("programm").router);
app.use("/users", new BaseRouter<User>("users").router);

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});