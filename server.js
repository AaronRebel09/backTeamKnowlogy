const express = require('express')
const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')

});

app.post('/mutation/', (req, res) => {
    console.log("hola mutation")
    console.log(res.json(req.body))
    hasMutation(req.body)
});

app.get('/stats', (req, res) => {
    res.send('Hello stats!')

});

function hasMutation(dna) {
    let has = false;
    console.log("dna => ")
    console.log(dna)
    console.log(String.valueOf(dna))
    console.log(has)
    return has;
}

app.listen(8000, () => {
    console.log('Example app listening on port 8000!')
});
