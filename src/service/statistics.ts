import axiosWithAuth from './axiosWithAuth';
import { ApiService } from '.';
import { CookiesService } from '../utils';

class StatisticsService extends ApiService {
	static #URL: string = `${StatisticsService.BASE_URL}/statistics`;

	static async get(period: 'day' | 'week' | 'month' | 'year') {
		try {
			const result = await axiosWithAuth(CookiesService.getCookies()).get(
				`${StatisticsService.#URL}?period=${period}`
			);

			return result.data;
		} catch (e) {
			console.log(e.message);
		}
	}
}

export default StatisticsService;
