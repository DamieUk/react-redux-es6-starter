import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Select, { components } from 'react-select';

const DropdownIndicator = (props) => {
  return components.DropdownIndicator && (
    <components.DropdownIndicator {...props}>
      <span className="icon-chevron-thin-down size-12 color-gray" />
    </components.DropdownIndicator>
  );
};

const Option = props => (
  <components.Option {...props} />
);

const customStyles = (hasError) => ({
  valueContainer: base => ({
    ...base,
    paddingLeft: 0,
  }),
  control: (base) => ({
    ...base,
    borderWidth: 1,
    minHeight: 36,
    borderRadius: 0,
    border: 'none',
    boxShadow: 'none !important',
    borderBottom: hasError ? '1px solid #E33A4F !important' : '1px solid #E8ECF1 !important',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  }),
  option: () => ({
    padding: 'none',
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  dropdownIndicator: () => ({ paddingRight: 15 }),
  placeholder: base => ({ ...base, color: '#CED4DB' })
});


const Dropdown = ({value, onChange, error, label, className, ...restProps }) => (
  <div className={cn(restProps.rootClassName)}>
    {label && <div className={cn('dp-label', { 'color-alert': !!error })}>{label}</div>}
    <Select
      {...restProps}
      className={cn('size-16', className)}
      classNamePrefix="dp"
      components={{ DropdownIndicator, Option }}
      styles={customStyles(!!error)}
      value={value}
      onChange={opt => onChange(opt.value)}
      onBlur={ev => ev}
      onFocus={ev => ev}
    />
  </div>
);

Dropdown.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.shape(),
    PropTypes.number,
    PropTypes.string,
  ]),
  onChange: PropTypes.func,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
	rootClassName: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape()),
};

Dropdown.defaultProps = {
  error: null,
  value: null,
};

export const FormDropdown = ({ input, meta: { error, touched }, ...restProps }) => (
  <Dropdown
    error={touched && error}
    {...input}
    {...restProps}
    value={restProps.options.find(opt => opt.value === input.value)}
  />
);

export default Dropdown;