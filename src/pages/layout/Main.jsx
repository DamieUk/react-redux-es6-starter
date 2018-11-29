import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import DialogContent from '@material-ui/core/DialogContent';
import { Loader, AlertToast, Modal } from 'elements';
import { isLoading, hideToast, removeToast } from 'utils';

const mapStateToProps = state => ({
	globalLoading: isLoading('globalLoading')(state),
	toasts: state.communications.toasts,
	toastType: state.communications.toastType,
	prompt: state.communications.prompt,
});

const mapDispatchToProps = dispatch => ({
	hideToast: id => hideToast(dispatch, id),
	removeToast: id => removeToast(dispatch, id),
});

const Main = ({ globalLoading, prompt, hideToast, toasts, removeToast }) => {
	// helper components
	return (
		<div>
			<CSSTransitionGroup transitionName="global-loader" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
				{globalLoading && <Loader fullPage />}
			</CSSTransitionGroup>
			
				{toasts.map(toast => (
					<AlertToast
						key={toast.id}
						delay={3500}
						open={toast.open}
						type={toast.type}
						message={toast.message}
						onHide={() => {
							hideToast(toast.id);
							setTimeout(() => removeToast(toast.id), 400);
						}}
					/>
				))}
			{prompt && (
				<Modal
					cancelButtonLabel="No"
					saveButtonLabel="Yes"
					actionAlignment="center"
					{...prompt}
					title={null}
					open={!!prompt.open}
				>
					<DialogContent>
						<h1 className="mb-0 text-normal text-center">{prompt.title || 'Are you sure you want to cancel?'}</h1>
						{prompt.secondaryText && <div className="color-dark-gray text-center mt-25">{prompt.secondaryText}</div>}
					</DialogContent>
				</Modal>
			)}
		</div>
	);
};

Main.propTypes = {
	globalLoading: PropTypes.bool,
	openPrompt: PropTypes.bool,
	removeToast: PropTypes.func,
	hideToast: PropTypes.func,
	toastType: PropTypes.string,
	toasts: PropTypes.arrayOf(PropTypes.shape()),
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
