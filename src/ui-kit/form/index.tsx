import React from 'react';

type FormProps = {
	children: React.ReactNode;
	className?: string;
};

const Form = ({ children, className = '' }: FormProps) => {
	return (
		<form className={className} onSubmit={(e) => e.preventDefault()}>
			{children}
		</form>
	);
};

export default Form;
