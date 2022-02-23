import React from 'react';

import { Input, Select } from '../../../../ui-kit';

import { Roles } from '../../../../typing/enums';
import { RegistrationTypes } from '../../../../typing/types';

type RegisterFormStep1Props = {
	formData: RegistrationTypes.UserRegisterDataWithRepeatPassword;
	onChangeFormData: (
		values: RegistrationTypes.UserRegisterDataWithRepeatPassword
	) => void;
	formValidation: {
		[key: string]: { isValid: boolean; validationMessage: string };
	};
};

const RegisterFormStep1 = (props: RegisterFormStep1Props) => {
	const handleFormInputChange = (
		value: string | number,
		field: string
	): void => {
		props.onChangeFormData({ ...props.formData, [field]: value });
	};

	return (
		<>
			<Input
				value={props.formData.email}
				type="email"
				onChange={(value: string) => handleFormInputChange(value, 'email')}
				placeholder="Email"
				maxLength={56}
				isValid={props.formValidation.email?.isValid}
				validationMessage={props.formValidation.email?.validationMessage}
			/>
			<Input
				value={props.formData.password}
				type="password"
				onChange={(value: string) => handleFormInputChange(value, 'password')}
				placeholder="Input password"
				maxLength={16}
				isValid={props.formValidation.password?.isValid}
				validationMessage={props.formValidation.password?.validationMessage}
			/>
			<Input
				value={props.formData.repeatPassword}
				type="password"
				onChange={(value: string) =>
					handleFormInputChange(value, 'repeatPassword')
				}
				placeholder="Repeat password"
				maxLength={16}
				isValid={props.formValidation.repeatPassword?.isValid}
				validationMessage={
					props.formValidation.repeatPassword?.validationMessage
				}
			/>
			<Select
				options={[
					{
						id: Roles.company,
						name: 'Company',
						value: Roles.company.toString(),
					},
					{
						id: Roles.candidate,
						name: 'Candidate',
						value: Roles.candidate.toString(),
					},
					{
						id: Roles.recruiter,
						name: 'Recruiter',
						value: Roles.recruiter.toString(),
					},
				]}
				value={props.formData.userRole.toString()}
				onChange={() => handleFormInputChange(Roles.candidate, 'userRole')}
			/>
		</>
	);
};

export default RegisterFormStep1;
