// Core
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

// Reducers
import { togglersReducer as togglers } from '../../bus/client'
import { dataReducer as data } from '../../bus/briks/reducer'

// Middlewares
import { middlewares } from './middlewares';

export const rootReducer = combineReducers({
    data,
    togglers,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
