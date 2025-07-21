const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

const createWorkout = async (req, res) => {
    const {title, reps, weight} = req.body

    let emptyfields = []

    if(!title){
        emptyfields.push('title')
    }
    if(weight !== undefined && isNaN(Number(weight))){ 
        emptyfields.push('weight')
    }
    if(reps !== undefined && isNaN(Number(reps))){       
      emptyfields.push('reps')
    }
    if(emptyfields.length>0){
        return res.status(400).json({error: 'Please fill in all fields', emptyfields })
    }

    try{
        const workout = await Workout.create({title, reps, weight})
        res.status(200).json(workout)
    }catch (error) {
        res.status(400).json({error: error.message})
    }

}

const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)

}

const getWorkout = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Workout not found.'})
    }

    const workout = await Workout.findById(id)

    if (!workout){
        return res.status(404).json({error: 'Workout not found.'})
    }
    res.status(200).json(workout)
}

const deleteWorkout = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Workout not found.'})
    }
    
    const workout = await Workout.findOneAndDelete({_id: id})
    
    if (!workout){
        return res.status(404).json({error: 'Workout not found.'})
    }
    
    res.status(200).json(workout)
}

const updateWorkout = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Workout not found.'})
    }
    
    const workout = await Workout.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true} 
    )
    
    if (!workout){
        return res.status(404).json({error: 'Workout not found.'})
    }

    res.status(200).json(workout)

}

module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
}