import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Alert } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

import { RootState } from '../store/store';
import {
    addition,
    division,
    multiplication,
    subtraction,
} from '../store/CalcSlice';
import './CalcPage.scss';
import { CalcState } from "../AppTypes/AppTypes";
import '../App.scss';
/** 
const getStars = (num: any): number[] => {
    let fullStars=Math.floor(num);
    let rounding = num -  Math.floor(num) > 0 && num -  Math.floor(num) < .5   ? .5 : 1;
    fullStars = fullStars + rounding;
    let emptyStars=5.0 - fullStars

    
    return [fullStars ,emptyStars]
}

console.log('GETSTARS',getStars(4.4))
console.log('GETSTARS',getStars(4.7))
console.log('GETSTARS',getStars(2.36))
**/
// Simple FC to display and dispatch actions using the Redux pattern and includes a redux-thunk side effect
//  of loading the API data after an arithmatic operation takes place.
const CalcPage = () => {
    const [firstValue, setFirstValue] = useState<number>(0);
    const [secondValue, setSecondValue] = useState<number>(0);
    const calcValues: CalcState = useSelector((state: RootState) => state.calc);
    const dispatch: Dispatch<AnyAction> = useDispatch();

    useEffect(() => {
        // add the new message to state
        setFirstValue(calcValues.firstValue);
        setSecondValue(calcValues.secondValue);
    },
        [calcValues.firstValue, calcValues.secondValue]);

    return (
        <div >
            <h1>Redux</h1>
            First Value :{' '}
            <input onChange={event => setFirstValue(Number(event.target.value))} value={firstValue === 0 ? '' : firstValue}
                type="number"
            />
            <br />
            <br />
            Second Value :{' '}
            <input
                onChange={event => setSecondValue(Number(event.target.value))} value={secondValue === 0 ? '' : secondValue}
                type="number"
            />
            <br />
            <br />
            <span className='button-space'>
                <Button data-testid='addbutton' className='button-space' variant="contained" onClick={() => dispatch(addition({ firstValue, secondValue }))}>
                    Addition
                </Button>
            </span>
            <span className='button-space'>
                <Button className='button-space' variant="outlined" onClick={() => dispatch(division({ firstValue, secondValue }))}>
                    Division
                </Button>
            </span>
            <span className='button-space'>
                <Button className='button-space' variant="contained"
                    onClick={() => dispatch(multiplication({ firstValue, secondValue }))}
                >
                    Multiplication
                </Button>
            </span>
            <span className='button-space'>
                <Button className='button-space' variant="outlined"
                    onClick={() => dispatch(subtraction({ firstValue, secondValue }))}
                >
                    Subtraction
                </Button>
            </span>
            <hr />
            {calcValues.total ?
                <h4 className='calc__answer' data-testid='total'>{calcValues.firstValue} {calcValues.lastOperation} {calcValues.secondValue} = {calcValues.total}</h4>
                : <></>
            }
            {calcValues?.articles?.length ? <h5>Side Effect Middleware (Redux Thunk)</h5> : <></>
            }
            {
                calcValues.is_loading ? <Alert severity="info">Loading...</Alert> : null
            }
            {calcValues?.articles?.map((art,i) =>
                <Accordion className='calc__accordion'
                key={`acc-${i}`+art.title.substring(0, 10)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id={art.title.substring(0, 10)}
                        key={'as'+art.title.substring(0, 10)}
                    >
                        <Typography key={'t' + art.title.substring(0, 10)}
                        >{art.title.substring(0, 150)}</Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        key={'d' + art.title.substring(0, 10)}
                    >
                        <Typography
                            key={'t2' + art.title.substring(0, 10)}

                        >
                            <>
                                <span className='calc__accordion__details__text-section'
                                >{art.description}</span>
                                {art?.img ? <img alt={art.description.substring(0, 20)} className='calc__accordion__details__image' src={art?.img} /> : <></>}
                            </>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            )}
        </div>

    );
};

export default CalcPage;
