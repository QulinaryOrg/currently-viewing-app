import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

import Slash from './components/slash';
import Error404 from './components/error/404';

const store = createStore(
  reducers,
  compose(
    applyMiddleware(reduxThunk)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Slash}></Route>
        <Route path="*" component={Error404}></Route>
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.currently-viewing-app')
);
