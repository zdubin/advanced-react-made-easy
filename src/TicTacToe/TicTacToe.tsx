import React, { useCallback, useMemo, useState, useEffect } from "react";
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

    const [currentXorO, setNextMove]: [() => XorO, () => void] = useXorO();
    const [board, setBoard] = useState<BoardSquares>(
        [...emptyBoard]);
    const [winningSquares, setWinningSquares] = useState<number[][] | null>(null);

    const setPiece = (col: number, row: number) => {
        const nextBoard = [...board];
        nextBoard[col][row] = currentXorO();
        setNextMove();
        setBoard(nextBoard);
    }

    const getWinningCombo = useCallback((): number[][] | null => {

        if (board[2][2] && (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]))
            return [[0, 0], [1, 1], [2, 2]];
        else if (board[2][0] && board[0][2] === board[1][1] && board[1][1] === board[2][0])
            return [[0, 2], [1, 1], [2, 0]];

        for (let i = 0; i < 3; i++) {
            if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                return [[i, 0], [i, 1], [i, 2]];
            }
        }

        for (let j = 0; j < 3; j++)
            if (board[0][j] && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
                return [[0, j], [1, j], [2, j]];
            }

        return null;
    }, [board])

    useEffect(() => {
        setWinningSquares(getWinningCombo);
    }, [getWinningCombo]);

    const didWin = useCallback((): XorO | null => {
        return winningSquares ? board[winningSquares[0][0]][winningSquares[0][1]] : null;
    }, [board, winningSquares])

    const memoizedDidWin = useMemo<XorO | null>(() => didWin(), [didWin])


    return (
        <>
            {memoizedDidWin ? <h1>** {memoizedDidWin} Won**</h1> :
                <h1 data-testid='turn'>Turn {currentXorO()}</h1>
            }
            <div className="game-board">
                {
                    board.map((row, i) =>
                        row.map((_, j) => <div key={`row_${i}_${j}`}  data-testid={`row-${i}-${j}`}
                            className={winningSquares?.some(([a, b]) => a === i && b === j) ? "box box__winning" : "box"}>
                            <Spot row={i} column={j} spotValue={board[i][j]} setPiece={() => setPiece(i, j)} didWin={() => memoizedDidWin} />
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