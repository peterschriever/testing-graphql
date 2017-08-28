import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducers from "./app/reducers/reducer";
// import thunkMiddleware from "redux-thunk";
import ReduxPromise from 'redux-promise';

import Query from './app/components/Query';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Query />
  </Provider>,
  document.getElementById("example")
);
