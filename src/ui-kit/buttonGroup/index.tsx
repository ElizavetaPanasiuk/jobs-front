import React, { useEffect, useState } from 'react';

import './style.scss';

import { Button } from '..';

import { CommonTypes } from '../../typing/types';

type ButtonGroupProps = {
	valuesList: CommonTypes.ButtonGroupItem[];
	setValuesList: (valuesList: CommonTypes.ButtonGroupItem[]) => void;
	label?: string;
	disabled?: boolean;
};

const ButtonGroup = ({
	label = '',
	disabled = false,
	...props
}: ButtonGroupProps) => {
	const [selectedCount, setSelectedCount] = useState<number>(0);
	const handleClick = (id: number) => {
		const newValuesList = props.valuesList.map((el) =>
			el.id === id ? { ...el, selected: !el.selected } : el
		);
		props.setValuesList(newValuesList);
	};

	useEffect(() => {
		setSelectedCount(props.valuesList.filter((el) => el.selected).length);
	}, [props.valuesList]);

	return (
		<section className="button-group">
			{label && <label className="button-group__label">{label}</label>}
			{props.valuesList.map((el) => (
				<Button
					key={el.id}
					title={el.name}
					onClick={() => handleClick(el.id)}
					outline={!el.selected}
					size="small"
					disabled={(!el.selected && selectedCount >= 5) || disabled}
				/>
			))}
		</section>
	);
};

export default ButtonGroup;
