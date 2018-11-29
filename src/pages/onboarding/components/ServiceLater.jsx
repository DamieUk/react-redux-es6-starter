/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button } from 'elements';

const ServiceLaterPage = ({ history }) => {
	return (
		<div className="text-center pt-70 center-block large">
			<h2 className="mb-20">We are currently not in your area .... But we will be soon!</h2>
			<h2 className="mb-20">
				Thank you for your interest in Para! Unfortunately we have not yet begun operating in your
				area.
			</h2>
			<h2 className="mb-40">
				Please contact us at
				{' '}
				<a href="mailto:admin@joinpara.com">admin@joinpara.com</a>
				{' '}
				for more information or to stay up-to-date on Para’s expansion.
			</h2>
			<p>
				Follow Us on Instagram:
				{' '}
				<a href="https://www.instagram.com/para_services/" target="_blank">@para_services</a>
				{' '}
				and Facebook:
				{' '}
				<a href="https://www.facebook.com/JoinParaServices/" target="_blank">Para Services</a>
			</p>
			<Button label="Exit" onClick={() => history.push('/auth/sign-in')} />
		</div>
	);
};

ServiceLaterPage.propTypes = {
	history: PropTypes.shape(),
};

export default withRouter(ServiceLaterPage);
