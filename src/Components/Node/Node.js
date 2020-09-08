import React from 'react';
import '../../Styles/Node.css';

const Node = ({ row, col, status, visit, onMouseDownNode, onMouseEnterNode, onMouseUpNode }) => {
    //the first on mouse down is when clicked, the second on mouse down is the new function for handling when clicked
    return (
        <div className={`node ${status}`}
            id={`coordinate-${row}-${col}`}
            onMouseDown={() => onMouseDownNode(row, col)}
            onMouseEnter={() => onMouseEnterNode(row, col)}
            onMouseUp={() => onMouseUpNode()}>

        </div>
    )
}
export default Node;