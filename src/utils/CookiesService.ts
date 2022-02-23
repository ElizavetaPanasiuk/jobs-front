import Cookies from 'js-cookie';

class CookiesService {
	static setCookies(token: string, expireTimestamp: number): void {
		Cookies.set('token', token, {
			expires: 1,
		});
	}

	static getCookies(): string {
		const token = Cookies.get('token');
		return token;
	}

	static removeCookies(): void {
		Cookies.remove('token');
	}
}

export default CookiesService;
