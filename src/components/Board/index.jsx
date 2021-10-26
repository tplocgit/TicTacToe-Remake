import React from 'react'
import Square from '../Square'

/**
 * 
 * @param {number} size
 * @param {list} squares
 * @param {callback} onClick
 * @param {list} highlightItems
 * @returns {JSX.Element}
 */
const Board = ({size, squares, onClick, highlightItems}) => {
    const renderSquare = (i, isHighlight) => {
        return (
        <Square
            className={isHighlight ? "highlight" : ""}
            value={squares[i]}
            onClick={() => onClick(i)}
        />
        )
    }
    

    let boardItems = []
    
    let renderRow = rowI => {
        let rowItems = []
        for (let colI = 0; colI < size; ++colI) {
        let index = rowI * size + colI
        let isHighlight = highlightItems ? highlightItems.includes(index) : false
        rowItems.push(renderSquare(index, isHighlight))
        }
        return (<div className="board-row">{rowItems}</div>)
    }
    
    for(let i = 0; i < size; ++i)
        boardItems.push(renderRow(i))
    
    return (
        <div className="center">
        {/* <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
        </div> */}
        {boardItems}
        </div>
    );
}

export default Board