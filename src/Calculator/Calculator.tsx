import { useState, useEffect } from "react";
import React from 'react';
import { Fade } from "reactstrap"

import {CalculatorProps} from '../AppTypes/AppTypes'
import '../App.scss';
import './Calculator.scss';

const calcKeys = ['+','-','*','/','0','1','2','3','4','5','6','7','8','9','0','C'];


export const Calculator: React.FC<CalculatorProps> = ({ darkmode = false }: CalculatorProps): JSX.Element => {
    const [total, setTotal] = useState<number>(0);
    const [ current, setCurrent ] = useState<number>(0);
    const [oldTotal, setOldTotal] = useState<number>(0);
    const [oldCurrent, setOldCurrent] = useState<number>(0);

    useEffect(() => {
            setOldTotal(total);
    }, [total]);

    useEffect(() => {
                setOldCurrent(current);
        }, [current]);

    return (
        <div className="main-container">
            <div className="box total-box">
                <div className="item">Total: <Fade className='fade-inline'  in={total === oldTotal} data-testid='total'>{total}</Fade></div>
                <div className="item">Current: <Fade className='fade-inline'  in={current === oldCurrent} data-testid='current'><span>{current}</span></Fade></div>
            </div>
        <div className="calculator">
        {
                calcKeys.map((k,i) => <div className="box" key={`${k}-${i}`} onClick={() => { 
                    if (k >= '0' && k <= '9') 
                        setCurrent(10 * current + Number(k));
                    else if (k === '+')
                    {
                        const sum = Number(current) + Number(total);
                        setTotal(sum); 
                        setCurrent(0);
                    }
                    else if (k === '-')
                    {
                        const diff =  Number(total) - Number(current);
                        setTotal(diff); 
                        setCurrent(0);
                    }
                    else if (k === '*')
                    {
                        const sum = Number(current) * Number(total);
                        setTotal(sum); 
                        setCurrent(0);
                    }
                    else if (k === '/')
                    {
                        const diff =  Number(total) / Number(current);
                        setTotal(diff); 
                        setCurrent(0);
                    }
                    else if (k === 'C')
                    {
                        setTotal(0); 
                        setCurrent(0);
                    }

                    }                  
                }
                >{k}</div>)
            }
        </div>
        </div>
    );
}
export default Calculator;