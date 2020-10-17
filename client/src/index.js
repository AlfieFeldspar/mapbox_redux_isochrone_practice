import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxPromise from 'redux-promise';
import 'bootstrap/dist/css/bootstrap.css';
import App from './components/app';
import reducers from "./reducers";


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

//the REDUCERS hold the STATE
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>  
    <App />
  </Provider>,
  document.getElementById('root')
);