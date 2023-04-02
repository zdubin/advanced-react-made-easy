import {createSlice, MiddlewareAPI, PayloadAction, Dispatch} from '@reduxjs/toolkit';
import {Article,CalcState} from "../AppTypes/AppTypes";

export const initialState: CalcState = {
    firstValue: 0,
    secondValue: 0,
    total: 0
};



export const calcSlice = createSlice({
    name: 'calc',
    initialState,
    reducers: {
        addition: (state, action: PayloadAction<CalcState>) => {
            state.firstValue = action.payload.firstValue;
            state.secondValue =  action.payload.secondValue;
            state.total = action.payload.firstValue + action.payload.secondValue;
            state.lastOperation = '+';
        },
        subtraction: (state, action: PayloadAction<CalcState>) => {
            state.firstValue = action.payload.firstValue;
            state.secondValue =  action.payload.secondValue;
            state.total = action.payload.firstValue - action.payload.secondValue;
            state.lastOperation = '-';
        },
        multiplication: (state, action: PayloadAction<CalcState>) => {
            state.firstValue = action.payload.firstValue;
            state.secondValue =  action.payload.secondValue;
            state.total = action.payload.firstValue * action.payload.secondValue;
            state.lastOperation = '*';
        },
        division: (state, action: PayloadAction<CalcState>) => {
            state.firstValue = action.payload.firstValue;
            state.secondValue =  action.payload.secondValue;
            state.total = action.payload.firstValue / action.payload.secondValue;
            state.lastOperation = '/';
        },
        load_articles: (state, action: PayloadAction<Article[]>) => {
            state.articles = action.payload;
        }
    }
});

export const {
    addition,
    division,
    multiplication,
    subtraction,
    load_articles
} = calcSlice.actions;

export default calcSlice.reducer;
