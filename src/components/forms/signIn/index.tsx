import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import validator from 'validator';

import './style.scss';

import { Button, Form, Input } from '../../../ui-kit';

import { AppRoutes } from '../../../typing/enums';

import { signIn } from '../../../store/asyncActions';
import { useTypedSelector, useValidateForm } from '../../../hooks';

const VALIDATION_RULES: {
	[key: string]: [(value: string) => boolean, string][];
} = {
	email: [[(s: string) => validator.isEmail(s), 'Invalid email']],
	password: [[(s: string) => s.length >= 4, 'Minimum password length - 4']],
};

const SignIn = () => {
	const dispatch = useDispatch();

	const auth = useTypedSelector((state) => state.auth);

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const { isFormValid, formValidation } = useValidateForm(VALIDATION_RULES, [
		{
			state: email,
			name: 'email',
		},
		{
			state: password,
			name: 'password',
		},
	]);

	const handleSignIn = async () => {
		setLoading(true);
		await dispatch(signIn(email, password));
		setLoading(false);
	};

	return (
		<>
			<Form className="signIn-form">
				<h2>Sign in</h2>
				<Input
					value={email}
					onChange={setEmail}
					type="email"
					placeholder="email"
					maxLength={56}
					disabled={loading}
					isValid={formValidation.email?.isValid}
					validationMessage={formValidation.email?.validationMessage}
				/>
				<Input
					value={password}
					onChange={setPassword}
					type="password"
					placeholder="password"
					maxLength={16}
					disabled={loading}
					isValid={formValidation.password?.isValid}
					validationMessage={formValidation.password?.validationMessage}
				/>
				<Button
					title="Sign in"
					onClick={handleSignIn}
					disabled={!isFormValid || loading}
				/>
				<p>
					Or <NavLink to={AppRoutes.signUp}>Sign Up</NavLink>
				</p>
			</Form>
			{auth.authError && <p className="error">{auth.authErrorMessage}</p>}
		</>
	);
};

export default SignIn;
