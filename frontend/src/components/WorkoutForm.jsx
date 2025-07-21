import { useState } from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [weight, setWeight] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyfields, setEmptyfields] = useState([])

    const handleSubmit = async(e) => {
        e.preventDefault()

        const workout = {title, weight, reps}

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyfields(json.emptyfields || [])
        } 
        if(response.ok){
            setEmptyfields([])
            setError(null)
            setTitle('')
            setWeight('')
            setReps('')
            console.log('New workout added', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }
    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new workout:</h3>
            <label>Exercise: </label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyfields.includes('title') ? 'error': ''}
            />

            <label>Weight (lbs): </label>
            <input
                type="number"
                onChange={(e) => setWeight(e.target.value)}
                value={weight}
                className={emptyfields.includes('weight') ? 'error': ''}

            />

            <label>Reps: </label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyfields.includes('reps') ? 'error': ''}

            />
            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
        
    )
}
export default WorkoutForm