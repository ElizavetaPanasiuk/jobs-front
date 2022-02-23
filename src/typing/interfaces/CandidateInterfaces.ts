import { ApplicationStatuses } from "../enums";

interface ICandidateInfo {
	firstName: string;
  lastName: string;
  phone: string;
  email: string;
  letter: string;
  status: ApplicationStatuses;
  skills: string[],
  softSkills: string[],
}

export { ICandidateInfo };
