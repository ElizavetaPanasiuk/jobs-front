import axiosWithAuth from './axiosWithAuth';
import { ApiService } from '.';
import { CookiesService } from '../utils';

class ApplicationsService extends ApiService {
	static #URL: string = `${ApplicationsService.BASE_URL}/application`;
	static #APPLY_URL: string = `${ApplicationsService.#URL}/apply`;
	static #APPROVE_URL: string = `${ApplicationsService.#URL}/approve`;
	static #REJECT_URL: string = `${ApplicationsService.#URL}/reject`;
	static #LETTERS: string = `${ApplicationsService.#URL}/letters`;
	static #CANDIDATE_DATA: string = `${ApplicationsService.#URL}/candidateData`;

	static async getAll(page: number = 1, size: number = 10) {
		try {
			const result = await axiosWithAuth(CookiesService.getCookies()).get(
				`${ApplicationsService.#URL}?page=${page}&size=${size}`
			);

			return result.data;
		} catch (e) {
			console.log(e.message);
		}
	}

	static async apply(jobId: number, candidateLetter: string) {
		try {
			const result = await axiosWithAuth(CookiesService.getCookies()).post(
				ApplicationsService.#APPLY_URL,
				{
					...ApplicationsService.transformFormData({
						jobId,
						candidateLetter,
					}),
				}
			);

			return result.data;
		} catch (e) {
			console.log(e.message);
		}
	}

	static async approve(id: number) {
		try {
			const result = await axiosWithAuth(CookiesService.getCookies()).put(
				ApplicationsService.#APPROVE_URL,
				{ id }
			);

			return result.data;
		} catch (e) {
			console.log(e.message);
		}
	}

	static async reject(id: number) {
		try {
			const result = await axiosWithAuth(CookiesService.getCookies()).put(
				ApplicationsService.#REJECT_URL,
				{ id }
			);

			return result.data;
		} catch (e) {
			console.log(e.message);
		}
	}

	static async getApplicationLetters(id: number) {
		try {
			const result = await axiosWithAuth(CookiesService.getCookies()).get(
				`${ApplicationsService.#LETTERS}/${id}`
			);

			return result.data;
		} catch (e) {
			console.log(e.message);
		}
	}

	static async getApplicationCandidateData(id: number) {
		try {
			const result = await axiosWithAuth(CookiesService.getCookies()).get(
				`${ApplicationsService.#CANDIDATE_DATA}/${id}`
			);

			return result.data;
		} catch (e) {
			console.log(e.message);
		}
	}
}

export default ApplicationsService;
