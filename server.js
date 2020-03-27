const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json())

const host = process.env.IP  || '0.0.0.0';
const port = process.env.PORT || 8080;

const MongoClient = require('mongodb').MongoClient;
const dbName = process.env.database_name || process.env.MONGODB_DBNAME || 'dnadb';
const dnaCollection = 'dna';

// replace the uri string with your connection string.
const uri = "mongodb+srv://admin:admin@cluster0-drbzu.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
MongoClient.connect(uri, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
});

app.get('/debug', function(req, res, next) {

    let details = {
        "mongo_url": uri,
        "connected": false
    };

    MongoClient.connect(uri, (err, client) => {
        if (err) {
            console.error('Error occurred while connecting to MongoDB Atlas trying connecting data base dnadb...\n',err);
            res.send({success: false, result: 9999});
        } else {
            console.log('Connected to Mongo')
            details["connected"] = true;
            console.log("Updated details")
        }
        res.send(details);
        client.close();
    });
});

app.get('/', (req, res) => {
    res.send('Wellcome to DNA Has Mutation Rest API!')
});

app.get('/stats', (req, res) => {
    res.send('Hello stats!')
});

app.get('/dnas', (req, res) => {
    console.log('Hello dnas!');
    MongoClient.connect(uri, (err, client) => {
        if (err) {
          console.error('Error occurred while connecting to MongoDB Atlas trying connecting data base dnadb...\n',err);
          res.send({success: false, result: 9999});
        } else {
            const db = client.db(dbName);
            const collection = db.collection(dnaCollection);
            collection.find({}).toArray(function(err, docs) {                
                console.log("Found the following records");
                console.log(docs);   
                res.send(JSON.stringify(docs));             
            });  
            client.close();          
        }
    });
});

app.post('/mutation/', (req, res) => {
    console.log("hola mutation")
    console.log(req.body)    
    // hasMutation(dnaArr);
    const dna = req.body
    const json = JSON.stringify(dna)

    // payload
    let dnaData = null;
    //has mutation flag
    let has = false;

    try {
        dnaData = JSON.parse(json);
    } catch (e) {
        console.log('error ' + e)
    }       

    has = hasMutation(dnaData.dna)

    if(has){
        MongoClient.connect(uri, (err, client) => {
        if (err) {
          console.error('Error occurred while connecting to MongoDB Atlas trying connecting data base dnadb...\n',err);
          res.send({success: false, result: 9999});
        } else {
            const db = client.db(dbName);
            const collection = db.collection(dnaCollection);
            collection.insertOne(dna); 
            client.close();           
        }
        });
    }else{
        console.log("save failed mutation collection and count")
    }

    res.send('has mutation? : '+ has)
});

function hasMutation(dna) {
    let has = false
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
    const br = Array.from(b)
    const cr = Array.from(c)
    const dr = Array.from(d)
    const er = Array.from(e)
    const fr = Array.from(f)

    console.log("arrayNXN")
    arrayNXN.push(ar)
    arrayNXN.push(br)
    arrayNXN.push(cr)
    arrayNXN.push(dr)
    arrayNXN.push(er)
    arrayNXN.push(fr)
    console.log(arrayNXN)
    console.log("arrayNXN length")
    console.log(arrayNXN.length)
    console.log("for arrayNXN all letters")

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

    //const vectorCompleteCopy = vectorComplete
    console.log("string letras duplicadas 4 en secuencia Aaron")

    vector.forEach(l =>{        
        if(allEqual(l)) has = true
    })

    console.log(has)    
    return has;
}

function allEqual(input) {
    return input.split('').every(char => char === input[0]);
}

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something went wrong.')
});

app.listen(port, host);

console.log('Dna Backend started on: ' + host + ':' + port);