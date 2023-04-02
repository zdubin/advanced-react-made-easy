import { useCallback, useState, useContext } from "react";
import React from 'react';
import { UserType } from '../AppTypes/AppTypes';
import { UserContext } from "../App";
import Button from '@mui/material/Button';

import {CounterExampleProps} from '../AppTypes/AppTypes'
import '../App.scss';

const CounterExample: React.FC<CounterExampleProps> = ({ initialValue = 0 }: CounterExampleProps): JSX.Element => {
    const [counter, setCounter] = useState<number>(initialValue);
    const { name, setName } = useContext<UserType>(UserContext);

    const handleName = (n: string) => {
        if (setName)
            setName(n);
    }

    const handleIncrement = useCallback(() => {
        setCounter((prev: number) => prev + 1);
        // Dependency removed!
    }, []);

    const handleDelayedIncrement = useCallback(() => {
        // Using prev state helps us to avoid unexpected behaviour
        setTimeout(() => setCounter((prev: number) => prev + 1), 1000);
        // Dependency removed!
    }, []);

    return (
        <div>
            <h2>{`Counter is ${counter}`}</h2>
            <h2>{`Context: -> Name is ${name}`}</h2>
            <span className='button-space'>
                <Button variant="outlined" onClick={handleIncrement}>Instant increment</Button>
            </span>

            <span className='button-space'>
                <Button variant="contained" onClick={handleDelayedIncrement}>Delayed increment</Button>
            </span>

            <span className='button-space'>
                <Button variant="outlined" onClick={() => handleName(`${name}${counter}`)}>Name Change</Button>
            </span>
        </div>
    );
}
export default CounterExample;