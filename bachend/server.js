const express = require('express')
const dotenv=require('dotenv') 
const bodyparser=require('body-parser')
const cors=require("cors")


const { MongoClient } = require('mongodb');
dotenv.config()
const app = express()

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'passop';

const port = 3000
app.use(bodyparser.json())
app.use(cors())
client.connect();

//GET all tha passwords

app.get('/', async(req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.send(findResult)
})

//Save all passwords
 
app.post('/', async(req, res) => {
    const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);
  res.send({success:true, result:findResult})
})

//Delete passwords

app.delete('/', async(req, res) => {
    const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password);
  res.send({success:true, result:findResult})
})
app.delete('/', async (req, res) => {
  console.log("Delete request body:", req.body); 
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
