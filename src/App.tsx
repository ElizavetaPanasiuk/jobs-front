import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

import './styles/reset.scss';
import './styles/style.scss';

import { Loader } from './ui-kit';
import { Header, MainMenu } from './components';

import { AppRoutes } from './typing/enums';

import AppRouting from './routes';

import { setAuth, setUserData } from './store/actions';
import { CookiesService } from './utils';

type UserData = {
	id: number;
	email: string;
	roleId: number;
	exp: number;
};

const App = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const token = CookiesService.getCookies();

		if (token) {
			const { id, email, roleId: role } = jwt_decode<UserData>(token);
			dispatch(setUserData({ id, email, role }));
			dispatch(setAuth(true));
		} else {
			navigate(AppRoutes.signIn);
		}

		setLoading(false);
	}, []);

	return (
		<div className="app">
			{loading ? (
				<Loader />
			) : (
				<>
					<MainMenu />
					<div className="container">
						<Header />
						<main
							className={`main${
								location.pathname === AppRoutes.signIn
									? ' sign-in'
									: location.pathname === AppRoutes.signUp
									? ' sign-up'
									: ''
							}`}
						>
							<AppRouting />
						</main>
					</div>
				</>
			)}
		</div>
	);
};

export default App;
