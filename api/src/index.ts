import express from 'express';
import muscleGroupRouter from "./routes/muscleGroupRouter.js";

const app = express();
const PORT = 3000;

app.use(express.json())
app.get('/', (req: any, res: { json: (arg0: { message: string; }) => void; }) => {
    res.json({ message: "L'API de ton app de sport est prête !" });
});

app.use("/muscleGroups", muscleGroupRouter)
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});