interface IJobInfo {
	id: number;
	jobName: string;
	companyName: string;
	industryName: string;
	hourlyRate: number;
	createdAt: string;
	logoUrl: string;
}

interface IJobDetailedInfo extends IJobInfo {
	id: number;
	jobName: string;
	description: string;
	requiredExperience: number | null;
	companyName: string;
	industryName: string;
	hourlyRate: number;
	employmentType: string;
	createdAt: string;
	responsibilities: string[];
	applicationId: number | null;
}

interface INewJob {
	jobName: string;
	description: string;
	requiredExperience: number | null;
	hourlyRate: number;
	employmentType: string;
	responsibilities: string[];
	industryId: number;
}

export { IJobInfo, IJobDetailedInfo, INewJob };
