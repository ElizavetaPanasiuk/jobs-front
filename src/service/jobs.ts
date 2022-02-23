import axiosWithAuth from './axiosWithAuth';
import { ApiService } from './';
import { CookiesService } from '../utils';

import { INewJob } from '../typing/interfaces/JobInterfaces';

class JobsService extends ApiService {
	static #URL: string = `${JobsService.BASE_URL}/job`;
	static #RECRUITER_DATA: string = `${JobsService.#URL}/recruiterData`;

	static async getJobsList(
		page: number = 1,
		size: number = 10,
		search: string = '',
		industries: string[] = [],
		employmentTypes: string[] = [],
		minimumHourlyRate: number = 0,
		minimumExperienceYears: number = 0
	) {
		try {
			const result = await axiosWithAuth(CookiesService.getCookies()).get(
				`${JobsService.#URL}
					?page=${page}
					&size=${size}
					${search.length ? `&search=${search}` : ''}
					${industries.length ? `&industry=${industries.join(',')}` : ''}
					${employmentTypes.length ? `&employmentType=${employmentTypes.join(',')}` : ''}
					${minimumHourlyRate ? `&minimumHourlyRate=${minimumHourlyRate}` : ''}
					${minimumExperienceYears ? `&minimumExperience=${minimumExperienceYears}` : ''}
				`
			);

			return result.data;
		} catch (e) {
			console.log(e.message);
		}
	}

	static async getJobById(id: number) {
		try {
			const result = await axiosWithAuth(CookiesService.getCookies()).get(
				`${JobsService.#URL}/${id}`
			);

			return result.data;
		} catch (e) {
			console.log(e.message);
		}
	}

	static async getEmploymentType() {
		try {
			const result = await axiosWithAuth(CookiesService.getCookies()).get(
				`${JobsService.#URL}//employment-types`
			);

			return result.data;
		} catch (e) {
			console.log(e.message);
		}
	}

	static async create(jobData: INewJob) {
		try {
			const result = await axiosWithAuth(CookiesService.getCookies()).post(
				JobsService.#URL,
				{ ...JobsService.transformFormData(jobData) }
			);

			return result;
		} catch (e) {
			console.log(e.message);
		}
	}

	static async getRecruiterJobsList(
		page: number = 1,
		size: number = 10,
		search: string = ''
	) {
		try {
			const result = await axiosWithAuth(CookiesService.getCookies()).get(
				`${`${JobsService.#URL}/recruiter-jobs`}
					?page=${page}
					&size=${size}
					${search.length ? `&search=${search}` : ''}
				`
			);

			return result.data;
		} catch (e) {
			console.log(e.message);
		}
	}

	static async getCompanyJobsList(
		page: number = 1,
		size: number = 10,
		search: string = ''
	) {
		try {
			const result = await axiosWithAuth(CookiesService.getCookies()).get(
				`${`${JobsService.#URL}/company-jobs`}
					?page=${page}
					&size=${size}
					${search.length ? `&search=${search}` : ''}
				`
			);

			return result.data;
		} catch (e) {
			console.log(e.message);
		}
	}

	static async getJobRecruiterData(id: number) {
		try {
			const result = await axiosWithAuth(CookiesService.getCookies()).get(
				`${JobsService.#RECRUITER_DATA}/${id}`
			);

			return result.data;
		} catch (e) {
			console.log(e.message);
		}
	}
}

export default JobsService;
