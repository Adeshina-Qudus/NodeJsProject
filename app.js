require('dotenv').config();
const express = require('express');
const app = express();
const dbUrl = process.env.MONGO_URI 
const Connect =  require('./src/db/connectDB');
const port = 8080;
const router = require('./src/router/router');
const notFound = require('./src/middleware/Notfound')

app.use(express.json())
app.use('/api/user',router)
app.use(notFound)

Connect(dbUrl)
//promiseForHandlingError
.then(()=>{
    app.listen(port, ()=>{
        console.log(`app listening at port ${port}`)
    })
})
.catch((error) =>{
    console.log(error)
})

