class DateService {
	static #months: string[] = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	static beautifyDate(date: string): string {
		const dateValue = new Date(date);
		const day: number = dateValue.getDate();
		const monthName: string = DateService.#months[dateValue.getMonth()];
		const year: number = dateValue.getFullYear();
		return `${monthName} ${day}, ${year}`;
	}
}

export default DateService;
