import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import _noop from 'lodash/noop';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { SUCCESS_MARK } from 'enums';
import { showPrompt, hidePrompt, removePromptContent, remCalc } from 'utils';
import Button from './Button';
import store from '../store';

class ModalComponent extends Component {
	state = {
		exiting: false,
	};
	
	renderActions() {
		const {
			actionsClassName,
			cancelButtonLabel,
			saveButtonLabel,
			actions,
			actionAlignment,
			saving,
			onRequestClose,
		} = this.props;
		
		const CANCEL_BUTTON = (
			<Button
				label={cancelButtonLabel}
				key="cancel-button"
				color="secondary"
				style={{ minWidth: 100 }}
				onClick={onRequestClose}
			/>
		);
		
		const SAVE_BUTTON = (
			<Button
				label={saveButtonLabel}
				key="save-button"
				className="ml-10"
				onClick={() => this.props.onRequestClose(SUCCESS_MARK)}
				color="primary"
				style={{ minWidth: 100 }}
				disabled={saving}
			/>
		);
		
		const defaultActions = [
			CANCEL_BUTTON,
			SAVE_BUTTON,
		];
		
		return (
			<footer
				className={cn(
					actionsClassName,
					'dp-modal-footer flex',
					{ [`dp-modal-footer-${actionAlignment}`]: !!actionAlignment },
				)}
			>
				{actions || defaultActions}
			</footer>
		);
	}
	
	render() {
		const {
			title,
			content,
			shouldRenderActions,
			children,
			open,
			fullWidth,
			maxWidth,
			onRequestClose,
			fullScreen,
			onExited,
			isConfirm,
			classes,
		} = this.props;
		const { exiting } = this.state;
		
		const innerContent = content || children;
		
		return (
			<Dialog
				classes={{ container: cn(classes.full, classes[maxWidth]) }}
				fullScreen={fullScreen}
				onClose={onRequestClose}
				PaperProps={{
					className: cn('dp-modal scroll-content', {
						'exiting-modal': exiting,
					}),
				}}
				open={open}
				fullWidth={fullWidth}
				maxWidth={maxWidth}
				onEnter={() => this.setState({ exiting: false })}
				onExit={() => this.setState({ exiting: true })}
				aria-labelledby="dp-modal"
				scroll="paper"
				onExited={onExited}
			>
				{title && <DialogTitle disableTypography className="size-16" id="dp-modal">{title}</DialogTitle>}
				{!isConfirm && <div className="icon-close dp-icon-modal-close" onClick={onRequestClose} />}
				{innerContent}
				
				{shouldRenderActions && this.renderActions()}
			</Dialog>
		);
	}
}

const styles = {
	xs: { maxWidth: remCalc(350) },
	sm: { maxWidth: remCalc(400) },
	md: { maxWidth: remCalc(600) },
	lg: { maxWidth: remCalc(1000) },
	full: { width: '100%', height: 'auto', maxHeight: '97vh' },
};

const Modal = withStyles(styles)(ModalComponent);

ModalComponent.propTypes = {
	actions: PropTypes.node,
	classes: PropTypes.shape(),
	content: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xlg']),
	actionAlignment: PropTypes.oneOf(['right', 'center', 'left']),
	shouldRenderActions: PropTypes.bool,
	open: PropTypes.bool,
	saving: PropTypes.bool,
	onExited: PropTypes.func,
	onRequestClose: PropTypes.func,
	actionsClassName: PropTypes.string,
	cancelButtonLabel: PropTypes.string,
	saveButtonLabel: PropTypes.string,
	children: PropTypes.node,
	fullWidth: PropTypes.bool,
	isConfirm: PropTypes.bool,
	fullScreen: PropTypes.bool.isRequired,
};

ModalComponent.defaultProps = {
	title: null,
	content: null,
	actions: null,
	actionAlignment: 'right',
	shouldRenderActions: true,
	saving: false,
	fullWidth: true,
	maxWidth: 'sm',
	onRequestClose: _noop,
	actionsClassName: '',
	cancelButtonLabel: 'Cancel',
	saveButtonLabel: 'Save',
};

export default withMobileDialog({ breakpoint: 'md' })(Modal);
export { DialogContent };

export const confirm = (onSuccess = _noop, props = {}) => {
	showPrompt(store.dispatch, {
		...props,
		onRequestClose: type => {
			props.onRequestClose && props.onRequestClose();
			if (type === SUCCESS_MARK) onSuccess();
			hidePrompt(store.dispatch);
		},
		isConfirm: true,
		onExited: () => removePromptContent(store.dispatch),
	});
};
