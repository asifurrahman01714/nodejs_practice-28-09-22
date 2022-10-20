/* Create a new application instance using express server*/
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');

// Middle ware apps
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())




const uri = "mongodb+srv://nodeMongoBasic:wLLj-UL-LrC7LES@atlascluster.eb7mhhm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const productCollection = client.db("nodeMongoBasicDatabase").collection("nodeMongoBasicDatabasProducts");
  console.log("Database Connected");
  
  // Creating a post api
  app.post('/addProduct', (req, res)=>{
    const product = req.body;
    productCollection.insertOne(product)
    .then(data=>{
        res.send(data)
        console.log(data);
    })
  })

  // Get data from mongodb
  app.get('/products',(req,res)=>{
    productCollection.find({}).limit(4).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result)
      });
  })
});




// create a new route
app.get('/', (req,res) =>{
    res.sendFile(__dirname + '/product.html')
})

// create a user route
const users = ["asif", "sakib", "arif", "azad"];
app.get('/user/:id', (req,res)=>{ // dynamic route
    const id = req.params.id;
    const name = users[id];
    res.send({id,name});
})

// Create a product route
const products = [
    {name: "modhu", price: 120, quantity: 12},
    {name: "potol", price: 120, quantity: 12},
    {name: "alu", price: 120, quantity: 12},
    {name: "lau", price: 120, quantity: 12},
]
app.get('/products/:name', (req, res)=>{
    const productName = req.params.name;
    const product = products.find((product)=>{
        return product.name = productName;
    })
    console.log(product)
    res.send(product)
})

// Find product using filter method
/* app.get('/products/:name', (req, res)=>{
    const name = req.params.name;
    const product = products.filter(function(e){
        return e.name == "modhu"
    })
    console.log(product)
    res.send(product[0])
})
*/

// Creating a post route
app.post('/addUser', (req,res)=>{
    // save to database
    console.log('data received', req.body);
    res.send(req.body);

})

// Running the server on port 3000
app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})