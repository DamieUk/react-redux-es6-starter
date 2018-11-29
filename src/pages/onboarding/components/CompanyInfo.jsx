import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Field,
  reduxForm,
  change,
  getFormValues,
} from 'redux-form';
import { FormInput, ProgressDots, Autocomplete } from 'elements';
import { required, validator } from 'utils';
import { FormNames } from 'enums';

const collectLocationData = location => location.address_components.reduce((res, val) => {
  res[val.types[0]] = val.short_name;
  return res;
}, {});

const mapStateToProps = (state) => ({
  formValues: getFormValues(FormNames.company)(state) || {},
  initialValues: state.onboardingInfo[FormNames.company],
  formSteps: state.onboardingInfo.formSteps,
  activeStep: state.onboardingInfo.formActiveStep,
});

const mapDispatchToProps = (dispatch) => ({
  changeFormValue: (field, value) => dispatch(change(FormNames.company, field, value))
});

class UserCompanyInfo extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    changeFormValue: PropTypes.func,
    activeStep: PropTypes.number,
    formSteps: PropTypes.arrayOf(PropTypes.string),
  };

  handleAddressPopulate = (address) => {
    const location = collectLocationData(address);
    this.props.changeFormValue('geodata', address);
    this.props.changeFormValue('address.longitude', address.geometry.location.lng());
    this.props.changeFormValue('address.latitude', address.geometry.location.lat());

    Object.keys(location)
      .map(key => this.props.changeFormValue(`address.${key}`, location[key]));
  };

  render() {
    const { handleSubmit, formSteps, activeStep } = this.props;

    return (
      <form className="center-block small text-center pl-15 pr-15 fade-in" onSubmit={handleSubmit}>
        <h2 className="show-for-mobile mb-0">Enter Profile</h2>
        <h2 className="mb-30 show-for-desktop">Let us know a little bit about you.</h2>
        <div className="mb-30 show-for-mobile">
          <ProgressDots total={formSteps.length} active={activeStep + 1} />
        </div>

        <div className="mb-20">
          <Field
            required
            name="company"
            label="Company"
            validate={required}
            component={FormInput}
          />
        </div>
        <div className="mb-20">
          <Field
            required
            name="location"
            label="Location"
            validate={required}
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
            name="npi_number"
            label="NPI Number"
            placeholder="e.g. 1234"
            validate={required}
            component={FormInput}
          />
        </div>
        <div className="mb-20">
          <Field
            required
            label="Address"
            name="address_name"
            placeholder="e.g. 123 Main Str"
            validate={required}
            onSelect={this.handleAddressPopulate}
            component={Autocomplete}
          />
        </div>
        <div className="mb-20">
          <Field
            required
            label="City"
            name="address.locality"
            placeholder="Text"
            validate={required}
            component={FormInput}
          />
        </div>
        <div className="row">
          <div className="row">
            <div className="column medium-7 small-12">
              <Field
                required
                label="State"
                name="address.administrative_area_level_1"
                placeholder="e.g. Massachusetts"
                validate={required}
                component={FormInput}
              />
            </div>
            <div className="column medium-5 small-12">
              <Field
                required
                label="Zip Code"
                name="address.postal_code"
                placeholder="e.g. 02114"
                validate={required}
                component={FormInput}
              />
            </div>
          </div>
        </div>
        <button type="submit" hidden />
      </form>
    );
  }
}

const UserCompanyInfoForm = reduxForm({ form: FormNames.company })(UserCompanyInfo);

export default connect(mapStateToProps, mapDispatchToProps)(UserCompanyInfoForm);
