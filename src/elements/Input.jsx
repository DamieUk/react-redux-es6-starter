import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import MaskedInput from 'react-text-mask';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import _noop from 'lodash/noop';
import Loader from "./Loader";
import { generateId, remCalc } from '../utils';

const InputProps = {
	value: PropTypes.string,
	type: PropTypes.string,
	name: PropTypes.string,
	mask: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.bool,
	]),
	label: PropTypes.string,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	onRef: PropTypes.func,
	onChange: PropTypes.func,
	className: PropTypes.string,
	loading: PropTypes.bool,
	multiline: PropTypes.bool,
	fullWidth: PropTypes.bool,
	shouldShowError: PropTypes.bool,
	classes: PropTypes.shape(),
	startAdornment: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	endAdornment: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	error: PropTypes.any, // eslint-disable-line react/forbid-prop-types
};

const TextMaskCustom = (props) => {
	const { inputRef, ...other } = props;
	
	return (
		<MaskedInput
			{...other}
			ref={inputRef}
			mask={['1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
			placeholderChar={'\u2000'}
			showMask
		/>
	);
};

TextMaskCustom.propTypes = {
	inputRef: PropTypes.func.isRequired,
};

class BaseInput extends React.PureComponent {
	static propTypes = InputProps;
	
	static defaultProps = {
		label: '',
		value: '',
		name: '',
		mask: '',
		type: 'text',
		onChange: _noop,
		onRef: _noop,
		className: '',
		startAdornment: '',
		endAdornment: '',
		required: false,
		placeholder: '',
		disabled: false,
		multiline: false,
		error: null,
		loading: false,
		fullWidth: true,
		shouldShowError: false,
	};
	
	inputId = generateId();
	
	input = null;
	
	get rightAdornment() {
		if (this.props.loading) {
			return <Loader size={10} />;
		}
		
		return this.props.endAdornment;
	}
	
	render() {
		const {
			type,
			name,
			value,
			label,
			className,
			placeholder,
			disabled,
			required,
			onChange,
			multiline,
			error,
			fullWidth,
			startAdornment,
			classes,
			shouldShowError,
			mask,
		} = this.props;
		const endAdornment = this.rightAdornment;
		const maskedProps = mask ? { inputComponent: TextMaskCustom } : {};
		
		return (
			<div className={cn('relative', className)}>
				<TextField
					type={type}
					name={name}
					disabled={disabled}
					id={this.inputId}
					label={label}
					required={required}
					InputLabelProps={{
						shrink: true,
						classes: {
							root: classes.label,
						},
					}}
					inputRef={node => {
						this.input = node;
						this.props.onRef(node);
					}}
					InputProps={{
						...maskedProps,
						startAdornment: startAdornment && <InputAdornment position="start">{startAdornment}</InputAdornment>,
						endAdornment: endAdornment && <InputAdornment position="end">{endAdornment}</InputAdornment>,
						classes: {
							root: classes.input,
							underline: classes.underline,
						},
					}}
					error={!!error}
					placeholder={placeholder}
					helperText={shouldShowError && error}
					fullWidth={fullWidth}
					margin="none"
					onChange={ev => onChange(ev, ev.target.value)}
					value={value}
					multiline={multiline}
					mask={mask}
				/>
			</div>
		);
	}
}

const Input = withStyles({
	input: {
		fontFamily: 'CircularStd-Book',
		fontSize: remCalc(16),
		marginTop: '0px !important',
	},
	label: {
		color: '#A9B3BE',
		fontFamily: 'CircularStd-Book',
		fontSize: remCalc(18),
		position: 'relative',
		textAlign: 'left',
	},
	underline: {
		'&:after': {
			borderWidth: '1px !important',
		},
		'&:before': {
			borderWidth: '1px !important',
			borderColor: '#E8ECF1',
		},
	},
})(BaseInput);

Input.propTypes = InputProps;

export const FormInput = ({ input, meta: { error, touched }, ...restProps }) => (
	<Input
		error={touched && error}
		{...input}
		{...restProps}
	/>
);

export default Input;
