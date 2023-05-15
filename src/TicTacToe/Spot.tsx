import React from "react";

import { XorO } from '../AppTypes/AppTypes'
import { Button } from "reactstrap";

export const Spot: React.FC<{ spotValue: XorO, didWin: () => XorO | null, setPiece: () => void }> = ({ spotValue, didWin, setPiece }) => {

    return <>
        {spotValue ?? (!didWin() ?
            <Button className='button-space' variant="contained" onClick={() => setPiece()} >Select</Button> : null
        )
        }
    </>
}
