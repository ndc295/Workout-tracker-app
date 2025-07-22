import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useState } from "react";

const WorkoutDetails = ({ workout, dragAttributes = {}, dragListeners = {} }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const {dispatch} = useWorkoutsContext();
    const [isEditing, setIsEditing] = useState(false);
    const [formValues, setFormValues] = useState({
        title: workout.title,
        weight: workout.weight,
        reps: workout.reps,
    });
    let timeAgo = "Unknown date";
    if (workout.createdAt) {
        const dateObj = new Date(workout.createdAt);
         if (!isNaN(dateObj.getTime())) {
             timeAgo = formatDistanceToNow(dateObj, { addSuffix: true });
         }
    }

    const handleSave = async () => {
        const response = await fetch(`/api/workouts/${workout._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formValues),
        });
        if (response.ok) {
            const updated = await response.json();
            dispatch({ type: 'UPDATE_WORKOUT', payload: updated });
            setIsEditing(false);
        }
    };

    const handleClickDel = async() =>{
        if (isDeleting) return;
        setIsDeleting(true);

        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
    })
        
        const json= await response.json()
        console.log('Response from delete:', json);      
        if(response.ok){
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    return(
        <div className="workout-details">
             <div className="workout-header">
                <label><strong>Title: </strong></label>
                {isEditing ? (
                <input
                    name="title"
                    value={formValues.title}
                    onChange={e => setFormValues(v => ({ ...v, title: e.target.value }))}
                    autoFocus
                />
                ) : (
                <h4><strong>{workout.title}</strong></h4>
                )}

                
            </div>

            {/* Other fields */}
            <div>
                <label><strong>Weight (lbs): </strong></label>
                {isEditing ? (
                <input
                    name="weight"
                    type="number"
                    value={formValues.weight}
                    onChange={e => setFormValues(v => ({ ...v, weight: e.target.value }))}
                />
                ) : (
                <span>{workout.weight}</span>
                )}
            </div>
            <div>
                <label><strong>Reps: </strong></label>
                {isEditing ? (
                <input
                    name="reps"
                    type="number"
                    value={formValues.reps}
                    onChange={e => setFormValues(v => ({ ...v, reps: e.target.value }))}
                />
                ) : (
                <span>{workout.reps}</span>
                )}
            </div>
            <p>{timeAgo}</p>

            <div className="workout-actions"> 
                {/* Edit (pencil) icon */}
                {!isEditing && (
                    <span onClick={() => setIsEditing(true)} className="material-symbols-outlined edit-icon">
                    edit
                    </span>
                )}
                {/* Save button when editing */}
                {isEditing && (
                    <span onClick={handleSave} className="material-symbols-outlined save-icon">
                    check
                    </span>
                )}
                {/* Cancel button when editing */}
                {isEditing && (
                    <span onClick={() => setIsEditing(false)} className="material-symbols-outlined cancel-icon">
                    close
                    </span>
                )}
                {/* Delete & drag handles as before */}
                {!isEditing && (
                    <span onClick={handleClickDel} className="material-symbols-outlined delete-icon">delete</span>
                )}  
                 {!isEditing && (
                    <span {...dragAttributes} {...dragListeners} className="material-symbols-outlined drag-icon">drag_handle</span>
                 )}
                </div>
         </div>
    )
}

export default WorkoutDetails