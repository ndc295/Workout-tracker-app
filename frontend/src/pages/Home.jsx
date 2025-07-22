import { useEffect } from "react"
import WorkoutForm from '../components/WorkoutForm'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { DndContext } from '@dnd-kit/core';
import DraggableWorkout from '../components/DraggableWorkout'

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext()
    
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        fetchWorkouts()
    },[dispatch])

    const handleDragEnd = ({ active, over }) => {
        if (!over || active.id === over.id) return;

        const oldIndex = workouts.findIndex(w => w._id === active.id);
        const newIndex = workouts.findIndex(w => w._id === over.id);

        const reordered = [...workouts];
        const [moved] = reordered.splice(oldIndex, 1);
        reordered.splice(newIndex, 0, moved);

        dispatch({ type: 'SET_WORKOUTS', payload: reordered });
    };

    return (
        <div className="home">
            <DndContext onDragEnd={handleDragEnd}>
                <div className="workouts">
                      {workouts.map(workout => (
                        <DraggableWorkout key={workout._id} workout={workout} />
                      ))}
                </div>
            </DndContext>
            <WorkoutForm/>
        </div>
    )
}

export default Home