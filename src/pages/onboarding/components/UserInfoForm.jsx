import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import {
  Field,
  reduxForm,
  change,
  getFormValues,
} from 'redux-form';
import {
  FormInput,
  ProgressDots,
  FormDatePicker,
  FormDropdown,
} from 'elements';
import { required, validator } from 'utils';
import { FormNames } from 'enums';
import UserIcon from './UserIcon';

const SEX_OPTIONS = [{
  label: 'Male',
  value: 'male',
}, {
  label: 'Female',
  value: 'female',
}];

const mapStateToProps = (state) => ({
  formValues: getFormValues(FormNames.main)(state) || {},
  initialValues: state.onboardingInfo[FormNames.main],
  formSteps: state.onboardingInfo.formSteps,
  activeStep: state.onboardingInfo.formActiveStep,
});

const mapDispatchToProps = (dispatch) => ({
  changeImage: (image) => dispatch(change(FormNames.main, 'image', image)),
});

class UserMainInfo extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    changeImage: PropTypes.func,
    formValues: PropTypes.shape(),
    activeStep: PropTypes.number,
    formSteps: PropTypes.arrayOf(PropTypes.string),
  };

  onDrop = (files) => {
    this.props.changeImage(files[0]);
  };

  render() {
    const { formValues, handleSubmit, formSteps, activeStep } = this.props;
    const imageUrl = formValues && formValues.image && formValues.image.preview;

    return (
      <form className="center-block small text-center pl-15 pr-15 fade-in" onSubmit={handleSubmit}>
        <h2 className="show-for-mobile mb-0">Enter Profile</h2>
        <h2 className="mb-30 show-for-desktop">Let us know a little bit about you.</h2>
        <div className="mb-30 show-for-mobile">
          <ProgressDots total={formSteps.length} active={activeStep + 1} />
        </div>

        <Dropzone
          className="mb-20"
          onDrop={this.onDrop}
        >
          <UserIcon imageUrl={imageUrl} />
        </Dropzone>
        <div className="mb-20">
          <Field
            required
            name="firstName"
            label="First Name"
            validate={[required, validator.max255]}
            component={FormInput}
          />
        </div>
        <div className="mb-20">
          <Field
            name="middleName"
            label="Middle Name"
            component={FormInput}
          />
        </div>
        <div className="mb-20">
          <Field
            required
            name="lastName"
            label="Last Name"
            validate={[required, validator.max255]}
            component={FormInput}
          />
        </div>
        <div className="mb-20">
          <Field
            name="title"
            label="Title"
            component={FormInput}
          />
        </div>
        <div className="mb-20">
          <Field
            required
            name="phone"
            mask
            label="Phone"
            validate={validator.phone}
            component={FormInput}
          />
        </div>
        <div className="mb-20">
          <Field
            required
            name="gender"
            label="Gender"
            validate={required}
            options={SEX_OPTIONS}
            component={FormDropdown}
          />
        </div>
        <div className="mb-20">
          <Field
            required
            name="dob"
            label="Date of Birth"
            validate={required}
            component={FormDatePicker}
          />
        </div>
        <button type="submit" hidden />
      </form>
    );
  }
}

const UserInfoForm = reduxForm({
  form: FormNames.main,
})(UserMainInfo);

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoForm);
