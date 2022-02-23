import React, { useState } from 'react';

import './style.scss';

import { StepsScale } from '../../ui-kit';
import { Forms } from '../../components';

const Registration = () => {
	const [registrationStep, setRegitsrationStep] = useState<number>(1);

	return (
		<div id="registration-page">
			<StepsScale
				stepsCount={2}
				currentStep={registrationStep}
				setStep={setRegitsrationStep}
			/>
			<Forms.SignUp
				registrationStep={registrationStep}
				setRegitsrationStep={setRegitsrationStep}
			/>
		</div>
	);
};

export default Registration;
