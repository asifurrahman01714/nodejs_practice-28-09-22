/* Create a new application instance using express server*/
const express = require('express')
const app = express()

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
// Running the server on port 3000
app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})