import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import validator from 'validator';

import { Button, Input, Loader, Select } from '../../../../ui-kit';

import { LoadingStatuses } from '../../../../typing/enums';
import { RegistrationTypes } from '../../../../typing/types';

import { signUp } from '../../../../store/asyncActions';
import { useValidateForm } from '../../../../hooks';
import { CompaniesService } from '../../../../service';

const VALIDATION_RULES: {
	[key: string]: [(value: string) => boolean, string][];
} = {
	firstName: [[(s: string) => s.length > 0, 'The field is required']],
	lastName: [[(s: string) => s.length > 0, 'The field is required']],
	phone: [[(s: string) => validator.isMobilePhone(s), 'Invalid phone']],
};

const RecruiterStep2RegisterForm = ({
	userData,
}: {
	userData: RegistrationTypes.UserRegisterData;
}) => {
	const dispatch = useDispatch();
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const [loading, setLoading] = useState<LoadingStatuses>(
		LoadingStatuses.loading
	);
	const [saveLoading, setSaveLoading] = useState<boolean>(false);
	const [companies, setCompanies] = useState([]);
	const [companyId, setCompanyId] = useState<string | null>(null);
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
		setSaveLoading(true);
		await dispatch(
			signUp(userData.email, userData.password, userData.userRole, {
				firstName,
				lastName,
				phone,
				companyId: +companyId,
			})
		);
		setSaveLoading(false);
	};

	const getCompanies = async () => {
		const result = await CompaniesService.get();

		if (result) {
			setCompanies(
				result.map((el: any) => ({
					id: el.id,
					name: el.companyName,
					value: el.id.toString(),
				}))
			);
			setCompanyId(result[0].id.toString());
			setLoading(LoadingStatuses.success);
		} else {
			setLoading(LoadingStatuses.error);
		}
	};

	useEffect(() => {
		getCompanies();
	}, []);

	return (
		<>
			{loading === LoadingStatuses.loading ? (
				<Loader />
			) : (
				<>
					<Input
						value={firstName}
						onChange={setFirstName}
						placeholder="First Name*"
						maxLength={56}
						disabled={saveLoading}
						isValid={formValidation.firstName?.isValid}
						validationMessage={formValidation.firstName?.validationMessage}
					/>
					<Input
						value={lastName}
						onChange={setLastName}
						placeholder="Last Name*"
						maxLength={56}
						disabled={saveLoading}
						isValid={formValidation.lastName?.isValid}
						validationMessage={formValidation.lastName?.validationMessage}
					/>
					<Input
						value={phone}
						onChange={setPhone}
						placeholder="Phone"
						maxLength={20}
						disabled={saveLoading}
						isValid={formValidation.phone?.isValid}
						validationMessage={formValidation.phone?.validationMessage}
					/>
					<Select
						options={companies}
						value={companyId}
						onChange={setCompanyId}
					/>
					<Button
						title="Sign Up"
						onClick={handleSignUp}
						disabled={!isFormValid || saveLoading}
					/>
				</>
			)}
		</>
	);
};

export default RecruiterStep2RegisterForm;
