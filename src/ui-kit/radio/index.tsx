import React from 'react';

import './style.scss';

type RadioProps = {
	id: string;
	checked: boolean;
	value: string | number;
	name: string;
	onChange: (e: string | number) => void;
};

const Radio = (props: RadioProps) => {
	const handleRadio = (e: React.ChangeEvent<HTMLInputElement>): void => {
		props.onChange(props.value);
	};

	return (
		<label className="radio" htmlFor={props.id}>
			<input
				id={props.id}
				type="radio"
				checked={props.checked}
				value={props.value}
				onChange={handleRadio}
			/>
			<span className="label">{props.name}</span>
		</label>
	);
};

export default Radio;
