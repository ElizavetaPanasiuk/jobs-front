import React from 'react';

import './style.scss';

type ButtonProps = {
	title: string;
	onClick: () => void;
	outline?: boolean;
	size?: 'small' | 'normal';
	disabled?: boolean;
	className?: string;
};

const Button = ({
	outline = false,
	size = 'normal',
	disabled = false,
	className = '',
	...props
}: ButtonProps) => {
	const handleClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		props.onClick();
	};

	return (
		<button
			className={`button ${
				outline ? 'button button_outline' : ''
			} button_${size} ${className}`}
			onClick={handleClick}
			type="button"
			disabled={disabled}
		>
			{props.title}
		</button>
	);
};

export default Button;
