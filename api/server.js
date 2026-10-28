
import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

export let credenziali = null;

app.post('/verify-argo', (req, res) => {
    try {
        const {name, password, codScuola} = req.body;

        res.json({
            name: name,
            password: password,
            codScuola: codScuola
        });

        credenziali = { name, password, codScuola };
    } catch (error) {
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
