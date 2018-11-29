import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Alert = ({ type, children, className }) => {
  return (
    <div className={cn('dp-alert', className, `dp-alert-${type}`)}>
      {children}
    </div>
  );
};

Alert.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
  className: PropTypes.string,
  type: PropTypes.oneOf(['error', 'success', 'warning', 'info'])
};

export default Alert;