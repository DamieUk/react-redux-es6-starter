import React from 'react';
import PropTypes from 'prop-types';
import PlaidLink from "react-plaid-link";
import { connect } from 'react-redux';
import { isLoading } from 'utils';
import { FormNames } from 'enums';
import { Loader, icons, ProgressDots, Button } from 'elements';
import _isEmpty from "lodash/isEmpty";
import { selectBank } from '../actions';

const isProduction = NODE_ENV !== 'development';

const mapStateToProps = state => ({
	isLoading: isLoading('banks-info')(state),
	mainInfo: state.onboardingInfo[FormNames.main],
	formSteps: state.onboardingInfo.formSteps,
	activeStep: state.onboardingInfo.formActiveStep,
	selectedBank: state.onboardingInfo.bankAccount,
});

const mapDispatchToProps = dispatch => ({
	selectBankItem: (bank = {}) => selectBank(dispatch, bank),
});

class BankAccountInfoForm extends React.PureComponent {
	static propTypes = {
		isLoading: PropTypes.bool,
		mainInfo: PropTypes.shape(),
		selectedBank: PropTypes.shape(),
		selectBankItem: PropTypes.func,
		onFinish: PropTypes.func,
		activeStep: PropTypes.number,
		formSteps: PropTypes.arrayOf(PropTypes.string),
	};
	
	handleOnSuccess = (token, meta) => {
		this.props.selectBankItem({
			public_token: token,
			metadata: {
				"link_session_id": meta.link_session_id,
				"institution": meta.institution,
				"accounts": meta.accounts,
			},
		});
	};
	
	renderSuccessSection() {
		return (
			<React.Fragment>
				<h1 className="color-primary mb-40">Congratulations! Your account has been created.</h1>
				<img src="/images/logo/icon-blue.svg" alt="logo" className="width-100 mb-40" />
				<div>
					<Button label="Get Started" onClick={this.props.onFinish} />
				</div>
			</React.Fragment>
		);
	}
	
	renderPlaidSetupSection() {
		const { formSteps, activeStep, mainInfo: { firstName } } = this.props;
		return (
			<React.Fragment>
				<h2 className="show-for-mobile text-center mb-0">Setup Bank Account</h2>
				<ProgressDots
					className="mb-30 show-for-mobile"
					total={formSteps.length}
					active={activeStep + 1}
				/>
				
				<header>
					<h2>
						Almost done,
						{' '}
						{firstName}
						!
					</h2>
					<h2 className="mb-60">Firts Timer How do you want to pay nurses?</h2>
					<icons.MoneyIcon className="mb-20" />
					<p className="text-center show-for-desktop color-primary size-22 mb-20">
						Setup bank account securely with Plaid
					</p>
					<p className="text-center show-for-mobile size-16 mb-15">Setup bank account securely with Plaid</p>
				</header>
				<div className="text-center">
					<div className="plaid-button-disabled">
						<PlaidLink
							clientName={APP_NAME}
							env={isProduction ? NODE_ENV : 'sandbox'}
							product={["auth", "transactions"]}
							publicKey={PLAID_PUBLIC_KEY}
							onSuccess={this.handleOnSuccess}
						>
							<Button label="Setup Now" iconRight="icon-arrow-right" />
						</PlaidLink>
					</div>
				</div>
			</React.Fragment>
		);
	}
	
	render() {
		const { isLoading, selectedBank } = this.props;
		const isSucceeded = !_isEmpty(selectedBank);
		
		if (isLoading) {
			return <Loader />;
		}
		
		return (
			<div className="center-block medium pl-15 pr-15 fade-in text-center">
				{isSucceeded ? this.renderSuccessSection() : this.renderPlaidSetupSection()}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BankAccountInfoForm);
