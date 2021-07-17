import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducer/index';
import thunk from 'redux-thunk';

const middleware = [thunk];

import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
