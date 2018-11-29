import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button } from 'elements';

const PermissionPage = ({ history }) => {
	return (
  <div className="text-center  center-block pl-15 pr-15 medium pt-70">
    <h2 className="mb-30">Your facility already has an account, please contact your administrator to access the Para platform</h2>
    <Button label="Exit" onClick={() => history.push('/auth/sign-in')} />
  </div>
	);
};

PermissionPage.propTypes = {
  history: PropTypes.shape(),
};

export default withRouter(PermissionPage);
