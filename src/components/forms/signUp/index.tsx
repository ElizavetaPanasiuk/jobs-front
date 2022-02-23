import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import validator from 'validator';

import './style.scss';

import { Button, Form } from '../../../ui-kit';
import RegisterFormStep1 from './step1';
import RegisterFormStep2 from './step2';

import { AppRoutes } from '../../../typing/enums';
import { RegistrationTypes } from '../../../typing/types';

import { useValidateForm } from '../../../hooks';

type SignUpFormProps = {
	registrationStep: number;
	setRegitsrationStep: (step: number) => void;
};

const VALIDATION_RULES: {
	[key: string]: [(value: string) => boolean, string][];
} = {
	email: [[(s: string) => validator.isEmail(s), 'Invalid email']],
	password: [[(s: string) => s.length >= 4, 'Minimum password length - 4']],
	repeatPassword: [
		[(s: string) => s.length >= 4, 'Minimum password length - 4'],
	],
};

const SignUpForm = (props: SignUpFormProps) => {
	const [userRegisterData, setUserRegisterData] =
		useState<RegistrationTypes.UserRegisterDataWithRepeatPassword>({
			email: '',
			password: '',
			repeatPassword: '',
			userRole: 3,
		});

	const {
		isFormValid: isFirstStepFormValid,
		formValidation: firstStepFormValidation,
	} = useValidateForm(VALIDATION_RULES, [
		{
			state: userRegisterData.email,
			name: 'email',
		},
		{
			state: userRegisterData.password,
			name: 'password',
		},
		{
			state: userRegisterData.repeatPassword,
			name: 'repeatPassword',
		},
	]);

	const handleChangeStep = (): void => {
		if (props.registrationStep === 1) {
			props.setRegitsrationStep(2);
		} else {
			props.setRegitsrationStep(1);
		}
	};

	return (
		<Form className="signUp-form">
			<h2>Sign Up</h2>
			<h3>Step {props.registrationStep}</h3>
			{props.registrationStep === 1 ? (
				<RegisterFormStep1
					formData={userRegisterData}
					onChangeFormData={setUserRegisterData}
					formValidation={firstStepFormValidation}
				/>
			) : (
				<RegisterFormStep2
					userData={{
						email: userRegisterData.email,
						password: userRegisterData.password,
						userRole: userRegisterData.userRole,
					}}
				/>
			)}
			{props.registrationStep === 1 && (
				<Button
					title="Next"
					onClick={handleChangeStep}
					disabled={!isFirstStepFormValid}
				/>
			)}
			<p>
				Or <NavLink to={AppRoutes.signIn}>Sign In</NavLink>
			</p>
		</Form>
	);
};

export default SignUpForm;
