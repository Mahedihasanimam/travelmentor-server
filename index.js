const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config()
const app=express()
const port=process.env.PORT || 5000;

app.use(express.json())
app.use(cors())


const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.k4th77t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const tousristCollection = client.db("touristDB").collection('tourist')

   
    app.post('/addtourists',async(req,res)=>{
        const newtourist=req.body
        const result=await tousristCollection.insertOne(newtourist)
        res.send(result)
        console.log(req.body)
    })

    app.get('/addtourists',async(req,res)=>{
        const cursor=tousristCollection.find()
        const result=await cursor.toArray()
        res.send(result)
    })
    app.get('/addtourists/:email',async(req,res)=>{
        const cursor=tousristCollection.find({email:req.params.email})
        const result=await cursor.toArray()
        res.send(result)
    })
    
   
    app.get('/details/:id',async(req,res)=>{
        const id=req.params.id    
        console.log(id) 
        const query={_id: new ObjectId(id)}
        const result=await tousristCollection.findOne(query)
        res.send(result)
    })
    app.delete('/details/:id',async(req,res)=>{
      const id=req.params.id
      const query={_id:new ObjectId(id)}
      const result=await tousristCollection.deleteOne(query)
      res.send(result)
    })
   
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
   res.send('travel server is running')
})

app.listen(port,()=>{
    console.log(`server is running on : ${port}`)
})