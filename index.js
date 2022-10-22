/* Create a new application instance using express server*/
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;


// Middle ware apps
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())


const uri = "mongodb+srv://nodeMongoBasic:wLLj-UL-LrC7LES@atlascluster.eb7mhhm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// create a new route
app.get('/', (req,res) =>{
    res.sendFile(__dirname + '/product.html')
})


client.connect(err => {
  const productCollection = client.db("nodeMongoBasicDatabase").collection("nodeMongoBasicDatabasProducts");
  console.log("Database Connected");
  
  // Creating a post api
  app.post('/addProduct', (req, res)=>{
    const product = req.body;
    productCollection.insertOne(product)
    .then(data=>{
        // res.send(data)
        // console.log(data);
        res.redirect('/');
    })
  })

  // Deleting Items
  app.delete('/delete/:id',(req, res)=>{
    const productId = req.params.id;
    console.log(productId);

    productCollection.deleteOne({_id: ObjectId(productId)})
    .then(result=>{
        console.log(result.deletedCount);
        res.send(result.deletedCount>0)
    })
  })

  // Get specific data from mongodb
  app.get('/product/:id',(req,res)=>{
    const id = req.params.id;
    productCollection.find({_id:ObjectId(id)})
    .toArray((err,documents)=>{
        res.send(documents[0])
    })
  })
  // Get data from mongodb
  app.get('/products',(req,res)=>{
    productCollection.find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result)
      });
  })
});


// Running the server on port 3000
app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})