import React from 'react';
import { view } from 'redux-elm';
import { reduxForm } from 'redux-form';

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
    const { fields: {firstName, lastName, email} } = this.props;
    const { submitting, handleSubmit, submitFailed } = this.props;
    const { model } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(submit)}>
          <legend>Redux-form</legend>
          {submitFailed? <div><strong>Submitting failed</strong></div> : ''}
          Is submitting: <strong>{ submitting? 'Yes' : 'No' }</strong>
          <div>
            <label>First Name (<small>{ firstName.visited? 'visited' : 'not visited' }</small>)</label>
            <input type="text" placeholder="First Name" {...firstName}/>
          </div>
          <div>
            <label>Last Name</label>
            <input type="text" placeholder="Last Name" {...lastName}/>
          </div>
          <button type="submit" disabled={submitting}>Submit</button>
        </form>
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
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  // WARNING! It is crucial to pass forwarded dispatch from ownProps
  dispatch: ownProps.dispatch,
});

NestedForm = reduxForm({
  form: 'nested',
  fields: ['firstName', 'lastName'],
}, undefined, mapDispatchToProps)(NestedForm);

// Wrap React Component in standard redux-elm stateless function
export default view(({ model, dispatch }) => (
  <NestedForm model={model} dispatch={dispatch} />
));
