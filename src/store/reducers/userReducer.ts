import { ActionType, UserStoreType } from '../../typing/types/storeTypes';

import { Actions } from '../../typing/enums';

const initialState: UserStoreType = {
	id: null,
	email: '',
	role: null,
};

const userReducer = (
	state: UserStoreType = initialState,
	action: ActionType
): UserStoreType => {
	switch (action.type) {
		case Actions.CLEAR_USER_DATA:
			return {
				...initialState,
			};
		case Actions.SET_USER_DATA:
			return {
				...action.payload,
			};
		default:
			return state;
	}
};

export default userReducer;
