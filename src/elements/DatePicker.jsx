import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _isString from 'lodash/isString';
import cn from 'classnames';
import { Calendar as DRCalendar } from 'react-date-range';
import TimePicker from 'react-datepicker';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';

class DatePicker extends Component {
  static propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape(),
    ]),
    minDate: PropTypes.shape(),
    maxDate: PropTypes.shape(),
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    format: PropTypes.string,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
  };

  static defaultProps = {
    format: 'MM/DD/YYYY',
    placeholder: 'Select date',
  };

  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  handleSelect = (date) => {
    const { onChange } = this.props;
    onChange(moment(date));
    this.setState({ open: false })
  };

  render() {
    const { value, format, error, label, className, placeholder, ...rest } = this.props;
    const { open } = this.state;

    return (
      <div className={cn('relative', className)}>
        {label && <div className={cn('dp-label', { 'color-alert': !!error })}>{label}</div>}
        <div
          ref={node => this.anchorEl = node}
          onClick={this.handleToggle}
          className={cn('dp-fake-input-view flex flex-between', {
            focused: open,
            'has-error': error
          })}
        >
          {value
            ? <span>{_isString(value) ? value : moment(value).format(format)}</span>
            : <span className="color-gray">{placeholder}</span>
          }
          <span className="icon-chevron-thin-down icon" />
        </div>
        <Popper
          open={open}
          anchorEl={this.anchorEl}
          transition
          disablePortal
          placement="bottom-start"
          style={{ right: 0 }}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: 'bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <DRCalendar
                    {...rest}
                    date={value ? moment(value) : null}
                    onChange={this.handleSelect}
                  />
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    )
  }
}

export const FormTimePicker = ({ input, label, className, placeholder, meta: { touched, error }, ...rest }) => (
  <div className={cn('relative', className)}>
    {label && <div className={cn('dp-label', { 'color-alert': !!(touched && error) })}>{label}</div>}
    <TimePicker
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeFormat="hh:mm A"
      dateFormat="LT"
      error={touched && error}
      {...rest}
      placeholderText={placeholder}
      className={cn('dp-time-picker', { 'has-error': !!(touched && error) })}
      selected={input.value ? moment(input.value) : null}
      onChange={input.onChange}
    />
  </div>
);

FormTimePicker.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  input: PropTypes.shape(),
  meta: PropTypes.shape(),
};

export const FormDatePicker = ({ input, meta: { touched, error }, ...rest }) => (
  <DatePicker
    error={touched && error}
    {...input}
    {...rest}
  />
);

export default DatePicker;

