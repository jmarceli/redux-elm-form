import React from 'react';
import { reduxForm, Field } from 'redux-form';

let Form = (props) => {
  // props from redux-form (divided into two lines for readability
  const { submitting, handleSubmit, submitFailed, submit } = props;

  return (
    <form onSubmit={handleSubmit(submit)}>
      <legend>Redux-form</legend>
      {submitFailed? <div><strong>Submitting failed</strong></div> : ''}
      Is submitting: <strong>{ submitting? 'Yes' : 'No' }</strong>
        <Field name="firstName" component={firstName =>
          <div>
            First Name ({firstName.visited? 'visited' : 'not visited'})
            <input type="text" {...firstName}/>
          </div>
        }/>
        <Field name="lastName" component={lastName =>
          <div>
            Last Name <input type="text" {...lastName}/>
          </div>
        }/>
      <button type="submit" disabled={submitting}>Submit</button>
    </form>
  );
};

Form = reduxForm({
  form: 'nested',
})(Form);

export default Form;
