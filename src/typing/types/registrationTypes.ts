import { Roles } from '../enums';

export type UserRegisterData = {
	userRole: Roles;
	email: string;
	password: string;
};

export type UserRegisterDataWithRepeatPassword = UserRegisterData & {
	repeatPassword: string;
};

export type EmployeeRegisterData = {
	firstName: string;
	lastName: string;
	phone: string;
};

export type CompanyRegisterData = {
	companyName: string;
	phone: string;
	companyDescription: string;
	logoUrl: string;
};

export type RecruiterRegisterData = {
	firstName: string;
	lastName: string;
	phone: string;
	companyId: number;
};
