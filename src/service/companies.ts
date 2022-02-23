import axios from 'axios';

import { ApiService } from '.';

class CompaniesService extends ApiService {
	static #URL: string = `${CompaniesService.BASE_URL}/company`;

	static async get() {
		try {
			const result = await axios.get(CompaniesService.#URL);

			return result.data;
		} catch (e) {
			console.log(e.message);
		}
	}
}

export default CompaniesService;
