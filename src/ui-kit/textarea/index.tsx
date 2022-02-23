import React from 'react';

import './style.scss';

type TextareaProps = {
	value: string;
	onChange: (e: string) => void;
	placeholder?: string;
	maxLength?: number;
	disabled?: boolean;
	label?: string;
};

const Textarea = ({
	placeholder = '',
	maxLength = 1000,
	disabled = false,
	label = '',
	...props
}: TextareaProps) => {
	const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
		props.onChange(e.target.value);
	};

	return (
		<>
			{label && <label className="textarea-label">{label}</label>}
			<textarea
				className="textarea"
				value={props.value}
				onChange={handleTextarea}
				placeholder={placeholder}
				maxLength={maxLength}
				disabled={disabled}
			/>
		</>
	);
};

export default Textarea;
