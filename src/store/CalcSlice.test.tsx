import { calcSlice } from './CalcSlice';

describe('calcSlice', () => {
  it('should handle addition', () => {
    const initialState = {
      firstValue: 0,
      secondValue: 0,
      total: 0,
      is_loading: false,
    };
    const action = {
      type: 'calc/addition',
      payload: {
        firstValue: 2,
        secondValue: 3,
      },
    };
    const expectedState = {
      firstValue: 2,
      secondValue: 3,
      total: 5,
      is_loading: false,
      lastOperation: "+",
    };
    expect(calcSlice.reducer(initialState, action)).toEqual(expectedState);
  });
});
