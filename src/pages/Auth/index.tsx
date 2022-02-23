import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

import './style.scss';

import { Forms } from '../../components';

import { useTypedSelector } from '../../hooks';

const Auth = () => {
	const navigate = useNavigate();

	const isAuth = useTypedSelector((state) => state.auth.isAuth);

	useEffect(() => {
		if (isAuth) {
			navigate('/');
		}
	}, [isAuth]);

	return (
		<div id="auth-page">
			<Forms.SignIn />
		</div>
	);
};

export default Auth;
