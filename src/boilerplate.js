import React from 'react';
import { render } from 'react-dom';
import { createStore, compose, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import reduxElm from 'redux-elm';

import { reducer as formReducer } from 'redux-form';

export default (containerDomId) => {
  const storeFactory = compose(
    reduxElm,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  let store;

  return (View, updater) => {
    if (!store) {
      store = storeFactory(combineReducers({
        root: updater,
        form: formReducer
      }));
    } else {
      store.replaceReducer(combineReducers({
        root: updater,
        form: formReducer
      }));
    }

    const ConnectedView = connect(appState => ({
      model: appState
    }))(View);

    render((
      <Provider store={store}>
        <ConnectedView />
      </Provider>
    ), document.getElementById(containerDomId));
  }
}
