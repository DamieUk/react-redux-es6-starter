import React from 'react';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import cn from 'classnames';
import _omit from 'lodash/omit';
import { colors } from 'enums';
import { remCalc } from 'utils';

const variantIcon = {
	success: CheckCircleIcon,
	warning: WarningIcon,
	error: ErrorIcon,
	info: InfoIcon,
};

const styles1 = () => ({
	success: {
		backgroundColor: colors.success,
	},
	error: {
		backgroundColor: colors.alert,
	},
	info: {
		backgroundColor: colors.primary,
	},
	warning: {
		backgroundColor: colors.warning,
	},
	icon: {
		fontSize: 18,
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: remCalc(10),
	},
	messageBox: {
		display: 'flex',
		alignItems: 'center',
	},
	action: {
		paddingLeft: 0,
	},
	message: {
		width: `calc(100% - ${remCalc(70)})`,
	},
});

function MySnackbarContent(props) {
	const { classes, className, message, onClose, variant, ...other } = props;
	const Icon = variantIcon[variant];
	
	return (
		<SnackbarContent
			className={cn(classes[variant], className)}
			classes={_omit(classes, ['success', 'info', 'error', 'warning', 'icon', 'messageBox', 'iconVariant'])}
			aria-describedby="client-snackbar"
			message={(
				<span id="client-snackbar" className={classes.messageBox}>
          <Icon className={cn(classes.icon, classes.iconVariant)} />
					{message}
        </span>
			)}
			action={[
				<IconButton
					key="close"
					aria-label="Close"
					color="inherit"
					onClick={onClose}
				>
					<CloseIcon className={classes.icon} />
				</IconButton>,
			]}
			{...other}
		/>
	);
}

MySnackbarContent.propTypes = {
	classes: PropTypes.shape().isRequired,
	className: PropTypes.string,
	message: PropTypes.node,
	onClose: PropTypes.func,
	variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

class AlertToast extends React.Component {
	static propTypes = {
		type: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
		delay: PropTypes.number,
		open: PropTypes.bool,
		message: PropTypes.node,
		onHide: PropTypes.func,
	};
	
	handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		
		this.props.onHide();
	};
	
	render() {
		const { type, open, delay, message } = this.props;
		
		return (
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				open={open}
				autoHideDuration={delay}
				onClose={this.handleClose}
			>
				<MySnackbarContentWrapper
					onClose={this.handleClose}
					variant={type}
					message={message}
				/>
			</Snackbar>
		);
	}
}

export default AlertToast;