import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout}) => {
    const {dispatch} = useWorkoutsContext()
    let timeAgo = "Unknown date";
    if (workout.createdAt) {
        const dateObj = new Date(workout.createdAt);
         if (!isNaN(dateObj.getTime())) {
             timeAgo = formatDistanceToNow(dateObj, { addSuffix: true });
         }
    }
  
    const handleClick = async() =>{
        const response = await fetch('/api/workouts/' + workout._id,{
        method: 'DELETE'
        })
        
        const json= await response.json()
        console.log('Response from delete:', json); // What does json._id look like?      
        if(response.ok){
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    return(
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Weight (lbs): </strong>{workout.weight}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{timeAgo}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
        </div>
    )
}

export default WorkoutDetails