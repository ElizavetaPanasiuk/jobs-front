import axiosWithAuth from './axiosWithAuth';
import { ApiService } from '.';
import { CookiesService } from '../utils';

class IndustriesService extends ApiService {
	static #URL: string = `${IndustriesService.BASE_URL}/industry`;

	static async get() {
		try {
			const result = await axiosWithAuth(CookiesService.getCookies()).get(
				IndustriesService.#URL
			);

			return result.data;
		} catch (e) {
			console.log(e.message);
		}
	}
}

export default IndustriesService;
