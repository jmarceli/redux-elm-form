import React from 'react';
import { reduxForm, Field } from 'redux-form';

/**
 * Example of Component based field
 */
class HideableInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nameHidden: false };
    this.toggleName = this.toggleName.bind(this);
  }

  toggleName() {
    this.setState({ nameHidden: !this.state.nameHidden });
  }

  render() {
    const { input: { visited } } = this.props;
    return(
      <div>
        First Name ({visited? 'visited' : 'not visited'})
        {this.state.nameHidden
        ? <input type="password" {...this.props}/>
        : <input type="text" {...this.props}/>
        }
        <label><input type="checkbox" onChange={this.toggleName} /> Hide name</label>
      </div>
    );
  }
}

// Form as stateless function
// it can't be "const" because of later reduxForm() binding
let Form = (props) => {
  const { submitting, handleSubmit, submitFailed, submit } = props;

  return (
    <form onSubmit={handleSubmit(submit)}>
      <legend>Redux-form</legend>
      {submitFailed? <div><strong>Submitting failed</strong></div> : ''}
      Is submitting: <strong>{ submitting? 'Yes' : 'No' }</strong>
        <Field name="firstName" component={HideableInput} />
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
