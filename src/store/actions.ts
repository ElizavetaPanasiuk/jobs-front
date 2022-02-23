import { Actions } from '../typing/enums';
import { IUser } from '../typing/interfaces';

export const clearUserData = () => ({
	type: Actions.CLEAR_USER_DATA,
});

export const setUserData = (payload: IUser) => ({
	type: Actions.SET_USER_DATA,
	payload,
});

export const setAuth = (payload: boolean) => ({
	type: Actions.SET_AUTH,
	payload,
});

export const setAuthError = (payload: string) => ({
	type: Actions.SET_AUTH_ERROR,
	payload,
});
