import { useState, useEffect } from "react";
import React from 'react';
import { Fade } from "reactstrap"

import { CalculatorProps } from '../AppTypes/AppTypes'
import '../App.scss';
import './Calculator.scss';

const calcKeys = [..."+-*/01234567890CR=".split('')];



export const Calculator: React.FC<CalculatorProps> = ({ darkmode = false }: CalculatorProps): JSX.Element => {
    const [total, setTotal] = useState<number>(0);
    const [current, setCurrent] = useState<number>(0);
    const [oldTotal, setOldTotal] = useState<number>(0);
    const [oldCurrent, setOldCurrent] = useState<number>(0);
    const [stagedOp, setStagedOp] = useState<string>('');

    useEffect(() => {
        setOldTotal(total);
    }, [total]);

    useEffect(() => {
        setOldCurrent(current);
    }, [current]);

    const performOp = () => {
        switch (stagedOp) {
            case '+':
                setTotal(Number(current) + Number(total));
                setCurrent(0);
                break;
            case '-':
                setTotal(Number(total) - Number(current));
                setCurrent(0);
                break;
            case '*':
                setTotal(Number(current) * Number(total));
                setCurrent(0);
                break;
            case '/':
                setTotal(Number(total) / Number(current));
                setCurrent(0);
        }
        setStagedOp('');

    }
    return (
        <div className="main-container">
            <div className="calcbox total-box">
                <div className="item">Total: <Fade className='fade-inline' in={total === oldTotal} data-testid='total'>{total}</Fade></div>
                {stagedOp ? <div className="staged-operation"> Staged: {stagedOp} </div> : null}
                <div className="item">Current: <Fade className='fade-inline' in={current === oldCurrent} data-testid='current'><span>{current}</span></Fade></div>
            </div>
            <div className="calculator" >
                {
                    calcKeys.map((k, i) => <div className={['=','R'].includes(k) ? "calcbox wide-buttons" : "calcbox"} key={`${k}-${i}`} onClick={() => {
                        if (k >= '0' && k <= '9') {
                            setCurrent(10 * current + Number(k));
                        }
                        else if (['+', '-', '*', '/'].includes(k)) {
                            setStagedOp(k);
                        }
                        else if (k === 'C') {
                            setTotal(0);
                            setCurrent(0);
                            setStagedOp('');
                        }
                        else if (k === 'R') {
                            setCurrent(Number(current) * -1);
                        }
                        else if (k === '=') {
                            performOp();
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