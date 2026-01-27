// @ts-ignore
import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req: any, res: { json: (arg0: { message: string; }) => void; }) => {
    res.json({ message: "L'API de ton app de sport est prête !" });
});

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});