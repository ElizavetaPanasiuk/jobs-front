import React from 'react';

import CompanyStep2RegisterForm from './companyForm';
import CandidateStep2RegisterForm from './candidateForm';
import RecruiterStep2RegisterForm from './recruiterForm';

import { RegistrationTypes } from '../../../../typing/types';

type RegisterFormStep2Props = {
	userData: RegistrationTypes.UserRegisterData;
};

const RegisterFormStep2 = (props: RegisterFormStep2Props) => {
	const renderStep2Form = () => {
		switch (props.userData.userRole) {
			case 2:
				return <CandidateStep2RegisterForm userData={props.userData} />;
			case 3:
				return <CompanyStep2RegisterForm userData={props.userData} />;
			case 4:
				return <RecruiterStep2RegisterForm userData={props.userData} />;
			default:
				return;
		}
	};

	return renderStep2Form();
};

export default RegisterFormStep2;
