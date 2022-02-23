import axiosWithAuth from './axiosWithAuth';
import { ApiService } from '.';
import { CookiesService } from '../utils';

class RecruitersService extends ApiService {
	static #URL: string = `${RecruitersService.BASE_URL}/recruiter`;

	static async get() {
		try {
			const result = await axiosWithAuth(CookiesService.getCookies()).get(
				RecruitersService.#URL
			);

			return result.data;
		} catch (e) {
			console.log(e.message);
		}
	}
}

export default RecruitersService;
