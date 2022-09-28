/* Create a new application instance using express server*/
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.json())
app.use(cors())
// create a new route
app.get('/', (req,res) =>{
    res.send('Hello World, I am a Node.js Developer')
})

// create a user route
const users = ["asif", "sakib", "arif", "azad"];
app.get('/user/:id', (req,res)=>{ // dynamic route
    const id = req.params.id;
    console.log(id);
    const name = users[id];
    res.send({id,name});
})

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