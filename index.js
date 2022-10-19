/* Create a new application instance using express server*/
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
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
    const name = req.params.name;
    const product = products.find(function(e){
        return e.name == "modhu"
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