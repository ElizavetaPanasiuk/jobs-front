import { ActionType, AuthStoreType } from '../../typing/types/storeTypes';

import { Actions } from '../../typing/enums';

const initialState: AuthStoreType = {
	isAuth: false,
	authErrorMessage: '',
	authLoading: false,
	authError: false,
};

const authReducer = (
	state: AuthStoreType = initialState,
	action: ActionType
): AuthStoreType => {
	switch (action.type) {
		case Actions.SET_AUTH:
			return {
				...initialState,
				isAuth: action.payload,
			};
		case Actions.SET_AUTH_ERROR:
			return {
				...state,
				authError: true,
				authErrorMessage: action.payload,
			};
		default:
			return state;
	}
};

export default authReducer;
