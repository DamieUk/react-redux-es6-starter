import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {
  Field,
  reduxForm,
  getFormError,
} from 'redux-form';
import { isLoading } from 'utils';
import { FormNames } from 'enums';
import { FormRadioGroup, Loader, ProgressDots, Alert } from 'elements';

const mapStateToProps = (state) => ({
  emrSystems: state.onboardingInfo.systems,
	initialValues: state.onboardingInfo[FormNames.emrSystems],
  loading: isLoading('emr-systems')(state),
  formError: getFormError(FormNames.emrSystems)(state),
  formSteps: state.onboardingInfo.formSteps,
  activeStep: state.onboardingInfo.formActiveStep,
});


class UserEmrSystems extends React.PureComponent {
  static propTypes = {
    emrSystems: PropTypes.arrayOf(PropTypes.string),
    handleSubmit: PropTypes.func,
    formError: PropTypes.string,
    loading: PropTypes.bool,
    activeStep: PropTypes.number,
    formSteps: PropTypes.arrayOf(PropTypes.string),
  };

  get groupOptions() {
    return this.props.emrSystems.map(label => ({ label, value: label }));
  }

  render() {
    const { loading, formSteps, activeStep, formError } = this.props;

    return (
      <div className="fade-in">
        <h2 className="show-for-mobile text-center mb-0">Enter Profile</h2>
        <div className="mb-30 show-for-mobile">
          <ProgressDots total={formSteps.length} active={activeStep + 1} />
        </div>
        <h2 className="mb-30 text-center show-for-desktop">
          What EMR system do you use?
        </h2>
        <form className="center-block small pl-15 pr-15" onSubmit={this.props.handleSubmit}>
          <div>
            <h4>EMR Systems</h4>
            <div className="mb-20">
              {loading ? <Loader /> : (
                <Field
                  required
                  name="emr-systems"
                  options={this.groupOptions}
                  component={FormRadioGroup}
                />
              )}
            </div>
          </div>
          { formError && <Alert type="error">{formError}</Alert> }
          <button type="submit" hidden />
        </form>
      </div>
    );
  }
}

export const UserEmrSystemsForm = reduxForm({ form: FormNames.emrSystems })(UserEmrSystems);

export default connect(mapStateToProps)(UserEmrSystemsForm);
