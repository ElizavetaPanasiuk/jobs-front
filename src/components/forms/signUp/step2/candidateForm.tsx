import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import validator from 'validator';

import { Button, Input } from '../../../../ui-kit';

import { RegistrationTypes } from '../../../../typing/types';

import { useValidateForm } from '../../../../hooks';
import { signUp } from '../../../../store/asyncActions';

const VALIDATION_RULES: {
	[key: string]: [(value: string) => boolean, string][];
} = {
	firstName: [[(s: string) => s.length > 0, 'The field is required']],
	lastName: [[(s: string) => s.length > 0, 'The field is required']],
	phone: [[(s: string) => validator.isMobilePhone(s), 'Invalid phone']],
};

const CandidateStep2RegisterForm = ({
	userData,
}: {
	userData: RegistrationTypes.UserRegisterData;
}) => {
	const dispatch = useDispatch();

	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	const { isFormValid, formValidation } = useValidateForm(VALIDATION_RULES, [
		{
			state: firstName,
			name: 'firstName',
		},
		{
			state: lastName,
			name: 'lastName',
		},
		{
			state: phone,
			name: 'phone',
		},
	]);

	const handleSignUp = async () => {
		setLoading(true);
		await dispatch(
			signUp(userData.email, userData.password, userData.userRole, {
				firstName,
				lastName,
				phone,
			})
		);
		setLoading(false);
	};

	return (
		<>
			<Input
				value={firstName}
				onChange={setFirstName}
				placeholder="First Name*"
				maxLength={56}
				disabled={loading}
				isValid={formValidation.firstName?.isValid}
				validationMessage={formValidation.firstName?.validationMessage}
			/>
			<Input
				value={lastName}
				onChange={setLastName}
				placeholder="Last Name*"
				maxLength={56}
				disabled={loading}
				isValid={formValidation.lastName?.isValid}
				validationMessage={formValidation.lastName?.validationMessage}
			/>
			<Input
				value={phone}
				onChange={setPhone}
				placeholder="Phone"
				maxLength={20}
				disabled={loading}
				isValid={formValidation.phone?.isValid}
				validationMessage={formValidation.phone?.validationMessage}
			/>
			<Button title="Sign Up" onClick={handleSignUp} disabled={!isFormValid} />
		</>
	);
};

export default CandidateStep2RegisterForm;
