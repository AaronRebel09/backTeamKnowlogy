const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const host = process.env.IP  || '0.0.0.0';
const port = process.env.PORT || 8080;

const mongoUri = process.env.uri;
const mongoUsername = process.env.username;
const mongoPassword = process.env.password;
const dbName = process.env.database_name || process.env.MONGODB_DBNAME || 'dnadb';

let dbConnectionUrl;


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-drbzu.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')

});

app.post('/mutation/', (req, res) => {
    console.log("hola mutation")
    console.log(req.body)
    const dnaArr = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
    // hasMutation(dnaArr);
    const dna = req.body
    const json = JSON.stringify(dna)

    // payload
    let dnaData = null;
    try {
        dnaData = JSON.parse(json);
    } catch (e) {
        console.log('error ' + e)
    }
    //res.send(dnaData)

    console.log("Data Base Connection");
    client.connect(uri, (err, client) => {
        if (err) {
          console.error(err);
          res.send({success: false, result: 9999});
        } else {
            const db = client.db(dbName);
            const collection = db.collection('dna');
            collection.find(dna);
            collection.insertOne(dna);
        }
    });

    res.send('has mutation? : '+ hasMutation(dnaData.dna))
});

function queryDB() {
    const dnaArr = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
}

app.get('/stats', (req, res) => {
    res.send('Hello stats!')
});

app.get('/dnas', (req, res) => {
    console.log('Hello dnas!');
    client.connect(uri, (err, client) => {
        if (err) {
          console.error(err);
          res.send({success: false, result: 9999});
        } else {
            const db = client.db(dbName);
            const collection = db.collection('dna');
            collection.find({}).toArray(function(err, docs) {                
                console.log("Found the following records");
                console.log(docs);   
                res.send(JSON.stringify(docs));             
            });            
        }
    });
});

function hasMutation(dna) {
    let has = false
    const dnaArrTrue = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
    const dnaArrFalse = ["ATGCGA","CAGTGC","TTATTT","AGACGG","GCGTCA","TCACTG"]
    // const [a,b,c,d,e,f] = dnaArr
    console.log("hasMutation Method")
    console.log(dna)
    const [a,b,c,d,e,f] = dna
    console.log("A")
    console.log(a)
    console.log("B")
    console.log(b)
    console.log("C")
    console.log(c)
    console.log("D")
    console.log(d)
    console.log("E")
    console.log(e)
    console.log("A EACH")
    let arrayNXN = []
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
                vector.push(word)
            }if(j==1){
                let w = arrayNXN[i][1]
                let x = arrayNXN[i][2]
                let y = arrayNXN[i][3]
                let z = arrayNXN[i][4]
                let word = w+x+y+z
                console.log("word")
                console.log(word)
                vector.push(word)
            }if(j==2){
                let w = arrayNXN[i][2]
                let x = arrayNXN[i][3]
                let y = arrayNXN[i][4]
                let z = arrayNXN[i][5]
                let word = w+x+y+z
                console.log("word")
                console.log(word)
                vector.push(word)
            }
            let f = arrayNXN[i][j]            
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
                vector.push(word)
            }if(j==1){
                let w = arrayNXN[1][i]
                let x = arrayNXN[2][i]
                let y = arrayNXN[3][i]
                let z = arrayNXN[4][i]
                let word = w+x+y+z
                console.log("word")
                console.log(word)
                vector.push(word)
            }if(j==2){
                let w = arrayNXN[2][i]
                let x = arrayNXN[3][i]
                let y = arrayNXN[4][i]
                let z = arrayNXN[5][i]
                let word = w+x+y+z
                console.log("word")
                console.log(word)
                vector.push(word)
            }                        
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
                vector.push(word)
            }if(j==1){
                let w = arrayNXN[i][1]
                let x = arrayNXN[i+1][2]
                let y = arrayNXN[i+2][3]
                let z = arrayNXN[i+3][4]
                let word = w+x+y+z
                console.log("word")
                console.log(word)
                vector.push(word)
            }if(j==2){
                let w = arrayNXN[i][2]
                let x = arrayNXN[i+1][3]
                let y = arrayNXN[i+2][4]
                let z = arrayNXN[i+3][5]
                let word = w+x+y+z
                console.log("word")
                console.log(word)
                vector.push(word)
            }
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
                vector.push(word)
            }if(j==1){
                let w = arrayNXN[1][i]
                let x = arrayNXN[2][i-1]
                let y = arrayNXN[3][i-2]
                let z = arrayNXN[4][i-3]
                let word = w+x+y+z
                console.log("word")
                console.log(word)
                vector.push(word)
            }if(j==2){
                let w = arrayNXN[2][i]
                let x = arrayNXN[3][i-1]
                let y = arrayNXN[4][i-2]
                let z = arrayNXN[5][i-3]
                let word = w+x+y+z
                console.log("word")
                console.log(word)
                vector.push(word)
            }            
        }
        console.log("--------")
    }

    console.log("*******")
    console.log("vector")
    console.log("--------")
    console.log(vector)

    const vectorReverse = []

    for(v of vector){
        vectorReverse.push(v.split("").reverse().join(""))
    }
    console.log("*******")
    console.log("vector reverse")
    console.log("--------")
    console.log(vectorReverse)

    console.log("*******")
    console.log("all combination vector")
    //const vectorComplete = [...vector , ...vectorReverse];    
    const vectorComplete = vector
    console.log("--------")
    console.log(vectorComplete)
    console.log("length vector")
    console.log(vectorComplete.length) 

    //const vectorCompleteCopy = vectorComplete
    console.log("string letras duplicadas 4 en secuencia Aaron")

    vector.forEach(l =>{
        //console.log(allEqual(l))
        if(allEqual(l)) has = true
    })

    //console.log(find_duplicate_in_array(vector));

    // let counts = [];
    // for(let i = 0; i <= vectorComplete.length; i++) {
    //     if(counts[vectorComplete[i]] === undefined) {
    //         counts[vectorComplete[i]] = 1;
    //     } else {
    //         has = true
    //     }
    // }

    // console.log("encontrando duplicado")
    // console.log(counts)
    // console.log("hasMutation ?")
    // console.log(has)

    // console.log("each parameter => ")
    // for (let i of dnaArrElements){
    //     console.log(i)
    // }

    //let has = false;
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

function allEqual(input) {
    return input.split('').every(char => char === input[0]);
}


function find_duplicate_in_array(arra1) {
    const object = {};
    const result = [];

    arra1.forEach(item => {
        if(!object[item])
            object[item] = 0;
        object[item] += 1;
    })

    for (const prop in object) {
        if(object[prop] >= 2) {
            result.push(prop);
        }
    }

    return result;

}

app.get('/debug', function(req, res, next) {

    var details = {
        "mongo_url": uri,
        "connected": false
    };

    client.connect(uri, (err, client) => {
        if (err) {
            console.error(err)
        } else {
            console.log('Connected to Mongo')
            details["connected"] = true;
            console.log("Updated details")
        }
        res.send(details);
    });
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something went wrong.')
});

app.listen(port, host);
//app.listen(port, () => {
//    console.log('Example app listening on port 8080!');
//});
console.log('Dna Backend started on: ' + host + ':' + port);