import React from "react";

import { XorO } from '../AppTypes/AppTypes'
import { Button } from "reactstrap";

export const Spot: React.FC<{ row: number, column: number, spotValue: XorO, didWin: () => XorO | null, setPiece: () => void }> = ({ row, column, spotValue, didWin, setPiece }) => {

    return <>
        {spotValue ?? (!didWin() ?
            <Button data-testid={`square-${row}-${column}`} className='button-space' variant="contained" onClick={() => setPiece()} >Select</Button> : null
        )
        }
    </>
}
