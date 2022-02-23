import React, { useState } from 'react';

import { Textarea } from '../../../ui-kit';
import { ModalForm } from '../..';

type SubmitApplicationModalProps = {
	onClose: () => void;
	onSubmit: (letter: string) => void;
	loading: boolean;
};

const SubmitApplicationModal = (props: SubmitApplicationModalProps) => {
	const [letter, setLetter] = useState<string>('');

	return (
		<ModalForm
			modalName="Submit application"
			onSubmit={() => props.onSubmit(letter)}
			onClose={props.onClose}
			requestLoading={props.loading}
		>
			<Textarea
				value={letter}
				onChange={setLetter}
				placeholder="Cover letter"
				maxLength={1000}
			/>
		</ModalForm>
	);
};

export default SubmitApplicationModal;
