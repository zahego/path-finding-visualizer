import React from 'react';
import '../../Styles/Node.css';

const Node = ({ row, col, id, status, visit, distance, prevNode, onMouseDownNode, onMouseEnterNode, onMouseUpNode }) => {
    //the first on mouse down is when clicked, the second on mouse down is the new function for handling when clicked
    return (
        <div className={`node ${status}`}
            id={id}
            distance={distance}
            prevNode={prevNode}
            onMouseDown={() => onMouseDownNode(row, col)}
            onMouseEnter={() => onMouseEnterNode(row, col)}
            onMouseUp={() => onMouseUpNode()}>

        </div>
    )
}
export default Node;