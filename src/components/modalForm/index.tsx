import React from 'react';

import './style.scss';

import { Button, Icon, Form, Modal } from '../../ui-kit';

import { IconNames } from '../../typing/enums';

type ModalFormProps = {
	children: React.ReactNode;
	modalName: string;
	onClose: () => void;
	onSubmit?: () => void;
	isDataValid?: boolean;
	requestLoading?: boolean;
};

const ModalForm = ({
	onSubmit = null,
	isDataValid = true,
	requestLoading = false,
	...props
}: ModalFormProps) => {
	return (
		<Modal className="modal-form">
			<Form>
				<div className="modal-form__header modal-header">
					<h3>{props.modalName}</h3>
					<button
						className="modal-header__close-button"
						onClick={props.onClose}
						disabled={requestLoading}
					>
						<Icon name={IconNames.cross} />
					</button>
				</div>
				<div className="modal-form__content">{props.children}</div>
				<div className="modal-form__buttons">
					{onSubmit && (
						<Button
							title="Submit"
							onClick={onSubmit}
							size="small"
							disabled={!isDataValid || requestLoading}
						/>
					)}
					<Button
						title="Cancel"
						onClick={props.onClose}
						size="small"
						disabled={requestLoading}
					/>
				</div>
			</Form>
		</Modal>
	);
};

export default ModalForm;
