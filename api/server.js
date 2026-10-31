
import express from 'express';
import { main } from './index.js';

const app = express();
const PORT = 3000;

app.use(express.json());

export let credenziali = null;

app.post('/verify-argo', async (req, res) => {
    const {name, password, codScuola} = req.body;

    credenziali = { name, password, codScuola };

    let risultato = await main(credenziali);

    if(risultato.successo){
        res.status(200).json({
            valid:true
        });
    } else{
        res.status(401).json({
            valid: false
        });
    }
});



app.get('/', (req,res) => {
    res.send(credenziali);
});

app.listen(PORT, () => {
    console.log(`Server avviato sulla porta ${PORT}`);
});
