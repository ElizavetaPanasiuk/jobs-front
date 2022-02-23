import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import validator from 'validator';

import { Button, Input, Textarea } from '../../../../ui-kit';

import { RegistrationTypes } from '../../../../typing/types';

import { signUp } from '../../../../store/asyncActions';
import { useValidateForm } from '../../../../hooks';

const VALIDATION_RULES: {
	[key: string]: [(value: string) => boolean, string][];
} = {
	companyName: [[(s: string) => s.length > 0, 'The field is required']],
	logoUrl: [[(s: string) => !s.length || validator.isURL(s), 'Invalid url']],
	phone: [[(s: string) => validator.isMobilePhone(s), 'Invalid phone']],
};

const CompanyStep2RegisterForm = ({
	userData,
}: {
	userData: RegistrationTypes.UserRegisterData;
}) => {
	const dispatch = useDispatch();
	const [companyName, setCompanyName] = useState<string>('');
	const [companyDescription, setCompanyDescription] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const [logoUrl, setLogoUrl] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const { isFormValid, formValidation } = useValidateForm(VALIDATION_RULES, [
		{
			state: companyName,
			name: 'companyName',
		},
		{
			state: logoUrl,
			name: 'logoUrl',
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
				companyName,
				companyDescription,
				phone,
				logoUrl,
			})
		);
		setLoading(false);
	};

	return (
		<>
			<Input
				value={companyName}
				onChange={setCompanyName}
				placeholder="Company Name*"
				maxLength={255}
				disabled={loading}
				isValid={formValidation.companyName?.isValid}
				validationMessage={formValidation.companyName?.validationMessage}
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
			<Input
				value={logoUrl}
				onChange={setLogoUrl}
				placeholder="Logo URL"
				maxLength={255}
				disabled={loading}
				isValid={formValidation.logoUrl?.isValid}
				validationMessage={formValidation.logoUrl?.validationMessage}
			/>
			<Textarea
				value={companyDescription}
				onChange={setCompanyDescription}
				placeholder="Company Description"
				maxLength={1000}
				disabled={loading}
			/>
			<Button
				title="Sign Up"
				onClick={handleSignUp}
				disabled={!isFormValid || loading}
			/>
		</>
	);
};

export default CompanyStep2RegisterForm;
