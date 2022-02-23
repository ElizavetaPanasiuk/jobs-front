import axiosWithAuth from './axiosWithAuth';
import { ApiService } from './';
import { CookiesService } from '../utils';

interface ICandidateProfile {
	firstName: string;
	lastName: string;
	phone: string;
	skills: string[];
	softSkills: string[];
}

interface ICompanyProfile {
	companyName: string;
	description: string;
	phone: string;
	logoUrl: string;
}

interface IRecruiterProfile {
	firstName: string;
	lastName: string;
	phone: string;
}

class ProfileService extends ApiService {
	static #URL: string = `${ProfileService.BASE_URL}/profile`;

	static async update(
		profileData: ICandidateProfile | ICompanyProfile | IRecruiterProfile
	) {
		try {
			const result = await axiosWithAuth(CookiesService.getCookies()).put(
				ProfileService.#URL,
				{ ...ProfileService.transformFormData(profileData) }
			);

			return result.data;
		} catch (e) {
			console.log(e.message);
		}
	}

	static async get() {
		try {
			const result = await axiosWithAuth(CookiesService.getCookies()).get(
				ProfileService.#URL
			);

			return result.data;
		} catch (e) {
			console.log(e.message);
		}
	}
}

export default ProfileService;
