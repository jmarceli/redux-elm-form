import React from 'react';
import { view, forwardTo } from 'redux-elm';
import { reduxForm } from 'redux-form';

import NestedForm from '../hello-form/view';

export default view(({ model, dispatch }) => (
  <div>
    Hello World!<br />
    Form example (built with redux-form) below:<br />
    <hr />
    <NestedForm model={model.helloForm} dispatch={forwardTo(dispatch, 'HelloForm')} />
  </div>
));
