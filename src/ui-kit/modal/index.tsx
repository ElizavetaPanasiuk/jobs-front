import React from 'react';

import './style.scss';

type ModalProps = {
	children: React.ReactNode;
	className?: string;
};

const Modal = ({ children, className = '' }: ModalProps) => {
	return (
		<div className="modal-background">
			<div className={`modal ${className}`}>{children}</div>
		</div>
	);
};

export default Modal;
