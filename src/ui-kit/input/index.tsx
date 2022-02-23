import React, { useState } from 'react';

import './style.scss';

type InputProps = {
	value: string;
	onChange: (e: string) => void;
	onFocus?: () => void;
	placeholder?: string;
	size?: 'small' | 'normal';
	type?: 'text' | 'email' | 'password' | 'money';
	maxLength?: number;
	disabled?: boolean;
	label?: string;
	className?: string;
	min?: number;
	isValid?: boolean;
	validationMessage?: string;
};

const Input = ({
	placeholder = '',
	size = 'normal',
	type = 'text',
	onFocus = () => {},
	maxLength = 1000,
	disabled = false,
	className = '',
	label = '',
	min = 0,
	isValid = true,
	validationMessage = '',
	...props
}: InputProps) => {
	const [isTouched, setTouched] = useState<boolean>(false);

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (
			type === 'money' &&
			(isNaN(+e.target.value) ||
				+(+e.target.value).toFixed(2) !== +e.target.value)
		) {
			return;
		}

		props.onChange(e.target.value);
	};

	const handleBlur = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (!isValid) {
			setTouched(true);
		}
	};

	return (
		<div className={`input ${className}`}>
			{label && <label className="input__label">{label}</label>}
			<input
				className={`input__field input__field_${size} ${
					isTouched && !isValid ? 'input__field_error' : ''
				}`}
				value={props.value}
				placeholder={placeholder}
				type={type === 'money' ? 'text' : type}
				onChange={handleInput}
				onFocus={onFocus}
				onBlur={handleBlur}
				maxLength={maxLength}
				min={min}
				disabled={disabled}
			/>
			{isTouched && !isValid && (
				<label className="input__error-message">{validationMessage}</label>
			)}
		</div>
	);
};

export default Input;
