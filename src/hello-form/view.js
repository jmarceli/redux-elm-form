import React from 'react';
import { view } from 'redux-elm';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

// standard submit mehod
// see: http://redux-form.com/5.2.5/#/api/props?_k=bc4k2f#-handlesubmit-eventorsubmit-function-
function submit(values, dispatch) {
  // redux-form expects Promise as submit result in order to switch submitting state
  // see: https://github.com/yelouafi/redux-saga/issues/161#issuecomment-191312502
  return new Promise((resolve, reject) => {
    dispatch({ type: 'Submit', data: values, resolve, reject });
  });
}

// Redux-form works only with React Components not with stateless functions like `redux-elm/view`
class NestedForm extends React.Component {
  render() {
    // props from redux-form (divided into two lines for readability
    const { submitting, handleSubmit, submitFailed } = this.props;

    return (
      <form onSubmit={handleSubmit(submit)}>
        <legend>Redux-form</legend>
        {submitFailed? <div><strong>Submitting failed</strong></div> : ''}
        Is submitting: <strong>{ submitting? 'Yes' : 'No' }</strong>
          <Field name="firstName" component={firstName =>
            <div>
              <input type="text" {...firstName}/>
            </div>
          }/>
          <Field name="lastName" component={lastName =>
            <div>
              <input type="text" {...lastName}/>
            </div>
          }/>
        <button type="submit" disabled={submitting}>Submit</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log(ownProps);
  return {
  // WARNING! It is crucial to pass forwarded dispatch from ownProps
  submit: ownProps.dispatch,
}};

NestedForm = connect(undefined, mapDispatchToProps)(NestedForm);

NestedForm = reduxForm({
  form: 'nested',
  //fields: ['firstName', 'lastName'],
})(NestedForm);

// Wrap React Component in standard redux-elm stateless function
export default view(({ model, dispatch }) => (
  <NestedForm model={model} dispatch={dispatch} />
));
