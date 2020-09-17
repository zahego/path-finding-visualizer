import React from 'react';
import Node from '../Node/Node';
import * as D from '../../Algorithms/Dijkstra';
import '../../Styles/Visualizer.css';

const numRow = 15;
const numCol = 50;
const startRow = 7;
const startCol = 6;
const endRow = 7;
const endCol = 44;

export default class Visualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iSPressed: false,
            nodes: []
        };
    }

    componentDidMount() {
        //shorthand for numRow:numRow since both parameter and value are the same
        this.setState({ nodes: initialRendering({ numRow, numCol, startRow, startCol, endRow, endCol }) });
    }
    handlingMouseDown = ({ row, col }) => {
        const newNodes = wallToggle({ grid: this.state.nodes, row, col });

        this.setState({ nodes: newNodes, iSPressed: true });
    }
    handlingMouseEnter = ({ row, col }) => {
        if (this.state.iSPressed === true) {
            const newNodes = wallToggle({ grid: this.state.nodes, row, col });
            this.setState({ nodes: newNodes });
        }
    }
    handlingMouseUp = () => {
        this.setState({ iSPressed: false });
    }


    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length-1) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            //figure out a way incorporate if statement around here so the start and end node stay same color
            //now after execute the button, only after clicking inside the grid does the animation start
            //and it finish everything
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(node.id).className ='node visited';
                
            }, 10 * i);
        }
    }

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`coordinate-${node.row}-${node.col}`).className ='node shortest-path';
            }, 50 * i);
        }
    }
    visualizeDijkstra = () => {
        const grid = this.state.nodes;
        const startNode = grid[startRow][startCol];
        const finishNode = grid[endRow][endCol];
        const visitedNodesInOrder = D.Dijkstra(grid, startNode, finishNode);
        
       const nodesInShortestPathOrder = D.getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
        //this.setState({ nodes: this.state.nodes });
    }
    render() {
        return (
            <div className='visualizer'>
                <button onClick={() => this.visualizeDijkstra()}>
                    Visualize Dijkstra's Algorithm
                </button>
                <div className='visualizer-flex'>
                    {/*console.log(this.state.nodes[7])*/}
                    {this.state.nodes.map((node, index) =>
                        <div className='visualizer-row' key={index}>
                            {node.map((n, i) => {
                                return <Node key={i}
                                    row={n.row}
                                    col={n.col}
                                    id={n.id}
                                    status={n.status}
                                    distance={n.distance}
                                    prevNode={n.prevNode}
                                    onMouseDownNode={() => this.handlingMouseDown({ row: n.row, col: n.col })}
                                    onMouseEnterNode={() => this.handlingMouseEnter({ row: n.row, col: n.col })}
                                    onMouseUpNode={() => this.handlingMouseUp()} />;

                            })}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}



const initialRendering = ({ numRow, numCol, startRow, startCol, endRow, endCol }) => {
    const grid = [];
    for (var row = 0; row < numRow; row++) {
        const currentRow = [];
        for (var col = 0; col < numCol; col++) {
            let currentNode = { row, col, status: "unvisited", distance: Infinity, prevNode: null, id:`coordinate-${row}-${col}` };
            if (row === startRow && col === startCol) {

                currentNode = { row, col, status: "start", distance: Infinity, prevNode: null, id:`coordinate-${row}-${col}` };
            }
            else if (row === endRow && col === endCol) {
                currentNode = { row, col, status: "end", distance: Infinity, prevNode: null, id:`coordinate-${row}-${col}` };
            }
            currentRow.push(currentNode);
        }
        grid.push(currentRow);
    }
    return grid;
}

const wallToggle = ({ grid, row, col }) => {
    //if don't slice, it will alter the origin array
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    if (node.status === "unvisited") {
        node.status = "wall"
    }
    else if (node.status === "wall") {
        node.status = "unvisited";
    }
    newGrid[row][col] = node;
    return newGrid;
}


