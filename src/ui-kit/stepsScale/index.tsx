import React from 'react';

import './style.scss';

type StepsScaleProps = {
	stepsCount: number;
	setStep: (step: number) => void;
	currentStep: number;
	className?: string;
};

const StepsScale = (props: StepsScaleProps) => {
	const renderSteps = () => {
		return new Array(props.stepsCount).fill(1).map((_el, id) => (
			<React.Fragment key={id}>
				<button
					className={`steps-scale__button ${
						id + 1 === props.currentStep ? 'steps-scale__button_active' : ''
					}`}
					onClick={() => props.setStep(id + 1)}
				>
					{id + 1}
				</button>
				{id + 1 !== props.stepsCount && <div className="steps-scale__line" />}
			</React.Fragment>
		));
	};

	return (
		<div className={`steps-scale ${props.className || ''}`}>
			{renderSteps()}
		</div>
	);
};

export default StepsScale;
