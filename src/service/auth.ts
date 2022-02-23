import axios from 'axios';

import { ApiService } from '.';

import { RegistrationTypes } from '../typing/types';

class AuthService extends ApiService {
	static #URL: string = `${AuthService.BASE_URL}/user`;

	static async signIn(email: string, password: string) {
		try {
			const result = await axios.post(
				`${AuthService.#URL}/login`,
				AuthService.transformFormData({
					email,
					password,
				})
			);

			return result;
		} catch (e) {
			return e.message;
		}
	}

	static async signUp(
		email: string,
		password: string,
		roleId: number,
		userData:
			| RegistrationTypes.CompanyRegisterData
			| RegistrationTypes.EmployeeRegisterData
			| RegistrationTypes.RecruiterRegisterData
	) {
		try {
			const result = await axios.post(
				`${AuthService.#URL}/registration`,
				AuthService.transformFormData({
					email,
					password,
					roleId,
					...userData,
				})
			);

			return result;
		} catch (e) {
			return e.message;
		}
	}
}

export default AuthService;
