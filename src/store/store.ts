import { configureStore, Dispatch, MiddlewareAPI } from '@reduxjs/toolkit';
import calcReducer, { load_articles, set_is_loading } from './CalcSlice';

export const myAPISideEffectMiddleware = ({ dispatch, getState }: MiddlewareAPI) => (next: Dispatch) => (action: any) => {
    // Here you have access to `action.type` and `action.payload`
    console.log('Logging action with type', action.type);
    // Get an apiKey here: https://newsapi.org/register and replace XXXXXX
    const url: string = 'https://newsapi.org/v2/everything?q=tech&apiKey=XXXXXX';

    if (action.type !== 'calc/load_articles' && action.type !== 'calc/set_is_loading') {
        dispatch(set_is_loading(true));

        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                dispatch(load_articles(json.articles.map(({ title, description, urlToImage }: any) => ({ title, description, img: urlToImage }))));
                dispatch(set_is_loading(false));
                return next(action);
            })
            .catch((error) => {
                console.error(error);
                dispatch(load_articles([{ title: error.message, description: `${url}: ${error.stack}` }]));
                dispatch(set_is_loading(false));
                return next(action);
            }
            )
    }
    else
        return next(action);
}

export const store = configureStore({
    reducer: {
        calc: calcReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(myAPISideEffectMiddleware),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
