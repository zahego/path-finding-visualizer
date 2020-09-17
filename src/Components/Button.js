import React from 'react'
import Node from './Node/Node';
import Visualizer from './Visualizer/Visualizer'


const STYLES = [
    'btn--primary',
    'btn--outline'
]

const SIZES = [
    'btn--medium',
    'btn--large'
]

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize,
    visualizeDijkstra
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

    
        return (
            <div className='visualizer'>
        
                <button onClick={() => visualizeDijkstra()}>
                    Visualize Test
                </button>
                
            </div>
        )
    
}