import React, { useMemo } from 'react';

import './style.scss';

import { Icon } from '..';

import { Colors, IconNames } from '../../typing/enums';

type CheckboxProps = {
	checked: boolean;
	label: string;
	id: number;
	onChange: () => void;
	disabled?: boolean;
};

const Checkbox = ({ disabled, ...props }: CheckboxProps) => {
	const checkboxId = useMemo(() => {
		return `${props.id}${props.label}`;
	}, []);

	return (
		<label className="checkbox">
			<input
				className="checkbox__input"
				type="checkbox"
				checked={props.checked}
				id={checkboxId}
				onChange={props.onChange}
				disabled={disabled}
			/>
			<span
				className={`checkbox__select ${
					disabled ? 'checkbox__select_disabled' : ''
				}`}
			>
				{props.checked && (
					<Icon
						name={IconNames.check}
						color={Colors.color_white_1}
						width={12}
						height={12}
					/>
				)}
			</span>
			<span className="checkbox__label">{props.label}</span>
		</label>
	);
};

export default Checkbox;
