import React, { useState } from 'react';
import Board from '../Board';
const BOARD_SIZE = 5

const Game = () => {
    const [history, setHistory] = useState([
        {
            squares: Array(Math.pow(BOARD_SIZE, 2) + 1).fill(null),
            location: null
        }
    ])
    const [stepNumber, setStepNumber] = useState(0)
    const [xIsNext, setXIsNext] = useState(true)
    const [reverseMoveList, setReverseMoveList] = useState(false)
    const [highlightItems, setHighlightItems] = useState([])

    const calculateWinner = (squares, location, stepNumber) => {
        if (!location) return undefined
        
        if (stepNumber === Math.pow(BOARD_SIZE, 2)) {
            return {value: 'draw', winCase: null}
        }
        
        let currentSquare = squares[location.row * BOARD_SIZE + location.col]
        
        let copy = [...squares]
        let board = []
        while(copy.length) board.push(copy.splice(0, BOARD_SIZE))
        
        let rowSquares = []
        let colSquares = []
        let diagSquares = []
        let antiSquares = []
        
        let locationToIndex = (row, col) => row * BOARD_SIZE + col
        for(let i = 0; i < BOARD_SIZE; ++i) {
            if (board[location.row][i] === currentSquare) rowSquares.push(locationToIndex(location.row, i))
            if (board[i][location.col] === currentSquare) colSquares.push(locationToIndex(i, location.col))
            if (board[i][i] === currentSquare) diagSquares.push(locationToIndex(i, i))
            if (board[BOARD_SIZE - i - 1][i] === currentSquare) antiSquares.push(locationToIndex(BOARD_SIZE - i - 1, i))
        }
        
        let winSquare = null
        let winSquares = null
        
        if (rowSquares.length === BOARD_SIZE) {
            winSquare = currentSquare
            winSquares = rowSquares
        }
        else if (colSquares.length === BOARD_SIZE) {
            winSquare = currentSquare
            winSquares = colSquares
        }
        else if (diagSquares.length === BOARD_SIZE) {
            winSquare = currentSquare
            winSquares = diagSquares
        }
        else if (antiSquares.length === BOARD_SIZE) {
            winSquare = currentSquare
            winSquares = antiSquares
        }
        if (winSquare) return {value: winSquare, winSquares: winSquares}
    }

    const handleClick = i => {
        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];
        const squares = current.squares.slice();
        let calcWinnerResult = calculateWinner(squares, current.location, stepNumber)

        // console.log(Math.floor(i / BOARD_SIZE), i % BOARD_SIZE)
        let moveLocation = {
            row: Math.floor(i / BOARD_SIZE),
            col: i % BOARD_SIZE,
            index: i
        }

        if (squares[i] || calcWinnerResult) {
        return
        }

        squares[i] = xIsNext ? "X" : "O";

        calcWinnerResult = calculateWinner(squares, moveLocation, stepNumber + 1)

        setHistory(newHistory.concat([
            {
            squares: squares,
            location: moveLocation
            }
        ]))
        setStepNumber(newHistory.length)
        setXIsNext(!xIsNext)
        setHighlightItems(calcWinnerResult ? calcWinnerResult.winSquares : [])
    }

    const jumpTo = step => {
        const newHistory = history.slice(0, step + 1);
        const current = newHistory[newHistory.length - 1];
        const squares = current.squares.slice();
        let calcWinnerResult = calculateWinner(squares, current.location, step)
        
        setStepNumber(step)
        setXIsNext((step % 2) === 0)
        setHighlightItems(calcWinnerResult ? calcWinnerResult.winSquares : [])
 
    }

    const newHistory = history;
    const current = newHistory[stepNumber];
    console.log(newHistory, stepNumber)
    console.log(current)
    let winner = calculateWinner(current.squares, current.location, stepNumber);
    winner = winner ? winner.value : winner
    const moves = history.map((step, move) => {
        const desc = move ?
        `Go to move #${move} at (${step.location.col}, ${step.location.row})`:
        'Go to game start';
        let className = move == stepNumber ? 'selected-item' : ''
        return (
        <li className={className} key={move}>
            <button className={className} onClick={() => jumpTo(move)}>{desc}</button>
        </li>
        );
    });
    if (reverseMoveList) moves.reverse()
    let status;

    if (winner && winner !== 'draw') {
        status = "Winner: " + winner;
    }
    else if (winner === 'draw') {
        status = 'Match End: Draw'
        alert(status)
    }
    else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
        <div className="game">
        <div className="game-board">
            <Board
            highlightItems = {highlightItems}
            squares={current.squares}
            onClick={i => handleClick(i)}
            size={BOARD_SIZE}
            />
        </div>
        <div className="game-info">
            <div>{status}</div>
            <br/>
            <div>
            <ol>{moves}</ol>
            <button onClick={()=>{setReverseMoveList(!reverseMoveList)}}>Reverse List Order</button>
            </div>
        </div>
        </div>
    );

}

export default Game
