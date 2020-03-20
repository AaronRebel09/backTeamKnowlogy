const express = require('express')
const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')

});

app.post('/mutation/', (req, res) => {
    console.log("hola mutation")
    const dnaArr = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
    // hasMutation(dnaArr);
    hasMutation(req.body)
    res.send('end mutation!')
});

function queryDB() {
    const dnaArr = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
}

app.get('/stats', (req, res) => {
    res.send('Hello stats!')
});

function hasMutation(dna) {
    const dnaArr = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
    // const [a,b,c,d,e,f] = dnaArr
    const json = JSON.stringify(dna)
    console.log("hasMutation Method")
    console.log("hasMutation dnaJSON")
    console.log(json)
    console.log("sin hasMutation dnaJSON")
    console.log(dna)
    const dnaParsed = JSON.parse(json)
    console.log("dnaParsed Method")
    console.log(dnaParsed)
    const [a,b,c,d,e,f] = dnaArr
    console.log("A")
    console.log(a)
    console.log("B")
    console.log(b)
    console.log("A EACH")
    const arrayNXN = []
    const ar = Array.from(a)
    console.log("ar =>")
    console.log(ar)
    // ar.forEach(l => {
    //     console.log(l)
    // });
    const br = Array.from(b)
    // br.forEach(l => {
    //     console.log(l)
    // });
    const cr = Array.from(c)
    // cr.forEach(l => {
    //     console.log(l)
    // });
    const dr = Array.from(d)
    // dr.forEach(l => {
    //     console.log(l)
    // });
    const er = Array.from(e)
    // er.forEach(l => {
    //     console.log(l)
    // });
    const fr = Array.from(f)
    // fr.forEach(l => {
    //     console.log(l)
    // });

    console.log("arrayNXN")
    arrayNXN.push(ar)
    arrayNXN.push(br)
    arrayNXN.push(cr)
    arrayNXN.push(dr)
    arrayNXN.push(er)
    arrayNXN.push(fr)
    console.log(arrayNXN)
    // dnaArr.forEach(elem => {
    //     console.log(elem);
    // });

    // let dnaArrElements = dnaArr.map(letter => {
    //     console.log(letter);
    //     let arr = [];
    //     arr.push(Array.from(letter));
    //     console.log(arr);
    //     return arr;
    // });
    // console.log("dnaArrElements => ")
    // console.log(dnaArrElements);
    // console.log("for dnaArrElements => ")
    // console.log("test arrayNXN")
    // console.log(arrayNXN[0][0])
    // console.log(arrayNXN[1][0])
    // console.log(arrayNXN[2][0])
    // console.log(arrayNXN[3][0])
    // console.log(arrayNXN[4][0])
    // console.log(arrayNXN[5][0])
    console.log("arrayNXN length")
    console.log(arrayNXN.length)
    console.log("for arrayNXN all letters")
    // for (let i=0; i<arrayNXN.length; i++) {
    //     for (let j=0; j<arrayNXN.length; j++) {
    //         console.log(arrayNXN[i][j])
    //     }
    // }
    //size of word
    const   WORD = 4
    //size of matrix
    const N = arrayNXN.length
    //vector with all combinations found
    const vector = []
    //horizontal
    console.log("horizontal")
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < 3; j++) {
            if(j==0){                
                let w = arrayNXN[i][0]
                let x = arrayNXN[i][1]
                let y = arrayNXN[i][2]
                let z = arrayNXN[i][3]
                let word = w+x+y+z                
                console.log("word")
                console.log(word)
            }if(j==1){
                let w = arrayNXN[i][1]
                let x = arrayNXN[i][2]
                let y = arrayNXN[i][3]
                let z = arrayNXN[i][4]
                let word = w+x+y+z
                console.log("word")
                console.log(word)
            }if(j==2){
                let w = arrayNXN[i][2]
                let x = arrayNXN[i][3]
                let y = arrayNXN[i][4]
                let z = arrayNXN[i][5]
                let word = w+x+y+z
                console.log("word")
                console.log(word)
            }
            let f = arrayNXN[i][j]
            vector.push(arrayNXN[i][j])
        }
        console.log("--------")
    }
    //vertical
    console.log("vertical")
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < 3; j++) {
            if(j==0){                
                let w = arrayNXN[0][i]
                let x = arrayNXN[1][i]
                let y = arrayNXN[2][i]
                let z = arrayNXN[3][i]
                let word = w+x+y+z                
                console.log("word")
                console.log(word)
            }if(j==1){
                let w = arrayNXN[1][i]
                let x = arrayNXN[2][i]
                let y = arrayNXN[3][i]
                let z = arrayNXN[4][i]
                let word = w+x+y+z
                console.log("word")
                console.log(word)
            }if(j==2){
                let w = arrayNXN[2][i]
                let x = arrayNXN[3][i]
                let y = arrayNXN[4][i]
                let z = arrayNXN[5][i]
                let word = w+x+y+z
                console.log("word")
                console.log(word)
            }
            let f = arrayNXN[i][j]
            vector.push(arrayNXN[i][j])
        }
        console.log("--------")
    }
    //oblicuo
    console.log("oblicuo derecha")
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if(j==0){                
                let w = arrayNXN[i][0]
                let x = arrayNXN[i+1][1]
                let y = arrayNXN[i+2][2]
                let z = arrayNXN[i+3][3]
                let word = w+x+y+z                
                console.log("word")
                console.log(word)
            }if(j==1){
                let w = arrayNXN[i][1]
                let x = arrayNXN[i+1][2]
                let y = arrayNXN[i+2][3]
                let z = arrayNXN[i+3][4]
                let word = w+x+y+z
                console.log("word")
                console.log(word)
            }if(j==2){
                let w = arrayNXN[i][2]
                let x = arrayNXN[i+1][3]
                let y = arrayNXN[i+2][4]
                let z = arrayNXN[i+3][5]
                let word = w+x+y+z
                console.log("word")
                console.log(word)
            }
            let f = arrayNXN[i][j]
            vector.push(arrayNXN[i][j])
        }
        console.log("--------")
    }
    //oblicuo
    console.log("oblicuo izquierda")
    for (let i = 5; i > 2; i--) {
        for (let j = 0; j < 3; j++) {
            if(j==0){                
                let w = arrayNXN[0][i]
                let x = arrayNXN[1][i-1]
                let y = arrayNXN[2][i-2]
                let z = arrayNXN[3][i-3]
                let word = w+x+y+z                
                console.log("word")
                console.log(word)
            }if(j==1){
                let w = arrayNXN[1][i]
                let x = arrayNXN[2][i-1]
                let y = arrayNXN[3][i-2]
                let z = arrayNXN[4][i-3]
                let word = w+x+y+z
                console.log("word")
                console.log(word)
            }if(j==2){
                let w = arrayNXN[2][i]
                let x = arrayNXN[3][i-1]
                let y = arrayNXN[4][i-2]
                let z = arrayNXN[5][i-3]
                let word = w+x+y+z
                console.log("word")
                console.log(word)
            }
            let f = arrayNXN[i][j]
            vector.push(arrayNXN[i][j])
        }
        console.log("--------")
    }


    // console.log("each parameter => ")
    // for (let i of dnaArrElements){
    //     console.log(i)
    // }

    let has = false;
    // console.log("dna => ")
    // console.log(dna.data)
    // const arrStrDNA = dna;
    // console.log("arrStrDNA => ")
    // console.log(dnaArr)
    // console.log("arrStrDNA 0 => ")
    // console.log(dnaArr[0])
    console.log(has)
    return has;
}

app.listen(8000, () => {
    console.log('Example app listening on port 8000!')
});
