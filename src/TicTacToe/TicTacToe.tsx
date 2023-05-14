import React, { useCallback, useMemo, useState } from "react";
import { Button } from "reactstrap";

import { useXorO } from "../CustomHooks/useXorO";
import { XorO } from '../AppTypes/AppTypes'
import { Spot } from './Spot';
import './TicTacToe.scss';

type BoardSquares = XorO[][];

const TicTacToe: React.FC = () => {
    const emptyBoard: BoardSquares = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    const [currentXorO, setNextMove]:[() => XorO, () => void] = useXorO();
    const [board, setBoard] = useState<BoardSquares>(
        [...emptyBoard]);

    const setPiece = (col: number, row: number) => {
        const nextBoard = [...board];
        nextBoard[col][row] = currentXorO();
        setNextMove();
        setBoard(nextBoard);
    }

    const didWin = useCallback((): XorO | null => {
        // diag win

        console.table(board)
        if ((board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
            (board[0][2] === board[1][1] && board[1][1] === board[2][0]) ) // && (board[1][1] === 'X' || board[1][1] === 'O'))
            {
 //               console.log(board[0][0], board[1][1] , board[2][2])
 //               console.log(board[0][2], board[1][1] , board[2][0])
                return board[1][1];
            }

        for (let i = 0; i < 3; i++) {
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2])
            {
//                console.log(board[i][0] ,board[i][1] ,board[i][2])
                return board[i][0];
            }
        }

        for (let j = 0; j < 3; j++)
            if (board[0][j] === board[1][j] && board[1][j] === board[2][j])
            {
 //               console.log(board[0][j] , board[1][j] , board[2][j])
                return board[0][j];
            }

        return null;
    },[board])

    const memoizedDidWin = useMemo<XorO | null>(() => didWin(), [currentXorO])


    return (
        <>
            {memoizedDidWin ? <h1>** {memoizedDidWin} Won**</h1> :
                <h1>Turn {currentXorO()}</h1>
            }
            <div className="game-board">
                {
                    board.map((row, i) =>
                        row.map((_, j) => <div key={`row_${i}_${j}`} className="box">
                            <Spot spotValue={board[i][j]} setPiece={() => setPiece(i, j)} didWin={() => memoizedDidWin} />
                        </div>
                        )
                    )
                }

            </div>
            <Button className='button-space' color="warning" onClick={() => setBoard([...emptyBoard])
                                                        }>Reset</Button>
        </>
    )
}
export default TicTacToe;