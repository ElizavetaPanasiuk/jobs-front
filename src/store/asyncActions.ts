import { Dispatch } from 'redux';
import jwt_decode from 'jwt-decode';

import { clearUserData, setAuth, setUserData, setAuthError } from './actions';
import AuthService from '../service/auth';
import { CookiesService } from '../utils';

import { RegistrationTypes } from '../typing/types';

type UserData = {
	id: number;
	email: string;
	roleId: number;
	exp: number;
};

const signIn =
	(email: string, password: string) => async (dispatch: Dispatch) => {
		const result = await AuthService.signIn(email, password);

		if (result.data?.token) {
			const token = result.data.token;
			const {
				id,
				email,
				roleId: role,
				exp: expires,
			} = jwt_decode<UserData>(token);
			dispatch(setUserData({ id, email, role }));
			dispatch(setAuth(true));
			CookiesService.setCookies(token, expires);
		} else {
			dispatch(setAuthError(result));
		}
	};

const signOut = () => async (dispatch: Dispatch) => {
	dispatch(setAuth(false));
	dispatch(clearUserData());
	CookiesService.removeCookies();
};

const signUp =
	(
		email: string,
		password: string,
		role: number,
		userData:
			| RegistrationTypes.CompanyRegisterData
			| RegistrationTypes.EmployeeRegisterData
			| RegistrationTypes.RecruiterRegisterData
	) =>
	async (dispatch: Dispatch) => {
		const result = await AuthService.signUp(email, password, role, userData);

		if (result.data?.token) {
			const token = result.data.token;
			const {
				id,
				email,
				roleId: role,
				exp: expires,
			} = jwt_decode<UserData>(token);
			dispatch(setUserData({ id, email, role }));
			dispatch(setAuth(true));
			CookiesService.setCookies(token, expires);
		} else {
			dispatch(setAuthError(result));
		}
	};

export { signIn, signOut, signUp };
