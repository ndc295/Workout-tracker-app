require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const workoutRoutes = require('./routes/workouts')

//express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.get('/', (req, res) => {
    res.json({mssg: ' Welcome to the app'})
})

app.use('/api/workouts', workoutRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT, () =>{
            console.log('Connected to DB and port ', process.env.PORT, ' and listening for requests')
        })
    })
    .catch((error)=>{
        console.log(error)
    })

