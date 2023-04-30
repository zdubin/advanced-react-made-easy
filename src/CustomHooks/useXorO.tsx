import { useState, useEffect } from "react";
import { XorO } from "../AppTypes/AppTypes";

export function useXorO(): [() => XorO ,() => void] {
    const [count, setCount] = useState<number>(0);  
    const currentXorO = ():XorO => count % 2 === 0 ? 'X' : 'O';
    const SetNextMove = ():void => setCount(count+1);

    return [currentXorO, SetNextMove];
}



