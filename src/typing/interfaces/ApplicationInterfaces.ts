import { ApplicationStatuses } from '../enums';

interface IApplicationInfo {
	id: number;
	jobId: number;
  candidateFirstName: string;
  candidateId: number;
  candidateLastName: string;
  jobName: string;
  recruiterId: number;
  status: ApplicationStatuses;
  updatedAt: string;
}

export { IApplicationInfo };
