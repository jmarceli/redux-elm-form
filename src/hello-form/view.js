import React from 'react';
import { view } from 'redux-elm';
import Form from './form/view';

// Wrap React Component in standard redux-elm view function
export default view(({ model, dispatch }) => {

  // normally dispatch was the second argument of submit()
  // but now we have to local dispatch instead of form dispatch
  // so it has to be removed
  function submit(values) {
    // redux-form expects Promise as submit result in order to switch submitting state
    // see: https://github.com/yelouafi/redux-saga/issues/161#issuecomment-191312502
    return new Promise((resolve, reject) => {
      dispatch({ type: 'Submit', data: values, resolve, reject });
    });
  }

  return (
    <div>
      <Form submit={submit} />
      {model.response
      ? <div>
          <h4>Response received (<small>by default it is just echo response</small>)</h4>
          <div>
            <code>
              {JSON.stringify(model.response)}
            </code>
          </div>
        </div>
      : ''}
    </div>
  )
});
