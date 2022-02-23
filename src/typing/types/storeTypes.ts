import { IUser } from '../interfaces/UserIntefaces';
import AppActions from '../enums/Actions';

export type AuthStoreType = {
	isAuth: boolean;
	authErrorMessage: string;
	authLoading: boolean;
	authError: boolean;
};

export type UserStoreType = {
	id: number;
	email: string;
	role: number;
};

export type CommonStoreType = {
	auth: AuthStoreType;
	user: IUser;
};

export type ActionType = {
	type: AppActions;
	payload: any;
};
