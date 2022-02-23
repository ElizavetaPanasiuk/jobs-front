class ApiService {
	static BASE_URL: string = 'https://job-back.herokuapp.com/api';

	static transformFormData(formData: any) {
		return Object.fromEntries(
			Object.entries(formData).map((el) => {
				const transformedValue =
					typeof el[1] === 'string' ? el[1].trim() : el[1];
				return [el[0], transformedValue];
			})
		);
	}
}

export default ApiService;
