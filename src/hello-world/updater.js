import { Updater } from 'redux-elm';

import helloFormUpdater, { init as helloFormInit } from '../hello-form/updater';

const initialModel = () => ({
  helloForm: helloFormInit()
});

export default new Updater(initialModel)
  .case('HelloForm', (model, action) => ({ ...model, helloForm: helloFormUpdater(model.helloForm, action) }))
  .toReducer();
