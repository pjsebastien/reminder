//Libraries
import React from 'react';

//Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import appReducer from './store/reducers/app';
import thunk from 'redux-thunk';

//Composants
import AppNavigator from './navigation/AppNavigator';

const store = createStore(appReducer, applyMiddleware(thunk));

export default function App() {
    return (
        <Provider store={store}>
            <AppNavigator />
        </Provider>
    );
}
