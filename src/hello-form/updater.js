import { Updater } from 'redux-elm';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import * as Effects from './effects';

/*
 * Handles form submitting
 * @param {Object} eventData - all event keys eg. data, resolve, reject
 */
function* submitForm(eventData) {
  // form data has to be attached to the event because form model is detached
  // so it can't be accessed from component model
  const result = yield call(Effects.submitForm, eventData.data, eventData.resolve, eventData.reject);
  // trigger Submitted with result received from remote server
  yield put({ type: 'Submitted', result });
}

function* saga() {
  // every 'Submit' event triggers submitForm subsaga
  yield* takeEvery('Submit', submitForm);
}

export const init = () => ({
  // response received from server after successful submission
  response: false
});

export default new Updater(init(), saga)
  .case('Submitted', (model, { result }) => ({ ...model, response: result }))
  .toReducer();
