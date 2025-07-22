import { useDraggable, useDroppable } from '@dnd-kit/core';
import WorkoutDetails from './WorkoutDetails';

const DraggableWorkout = ({ workout }) => {
    const { attributes, listeners, setNodeRef: setDragRef, transform } = useDraggable({
      id: workout._id,
    });

    const { setNodeRef: setDropRef } = useDroppable({
      id: workout._id,
    });

    const setCombinedRef = (node) => {
      setDragRef(node);
      setDropRef(node);
    };

    const style = {
      transform: transform
        ? `translate(${transform.x}px, ${transform.y}px)`
        : undefined,
      zIndex: transform ? 999 : 'auto',
      position: transform ? 'relative' : 'static',
    };

    return (
      <div ref={setCombinedRef} style={style}>
        <WorkoutDetails
          workout={workout}
          dragAttributes={attributes}
          dragListeners={listeners}
        />
      </div>
    );
};

export default DraggableWorkout;
