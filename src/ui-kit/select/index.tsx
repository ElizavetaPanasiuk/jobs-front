import React, { useEffect, useRef, useState } from 'react';

import './style.scss';

import { Icon } from '..';

import { IconNames } from '../../typing/enums';

type OptionType = {
	id: number;
	name: string;
	value: string;
};

type SelectProps = {
	value: string;
	onChange: (e: string) => void;
	options: OptionType[];
	size?: 'small' | 'normal';
};

const Select = ({ size = 'normal', ...props }: SelectProps) => {
	const [optionsVisibility, setOptionsVisibility] = useState<boolean>(false);
	const handleSelect = (value: string): void => {
		props.onChange(value);
		setOptionsVisibility(false);
	};

	const selectRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLDivElement>(null);

	const handleHideOptions = (e: any) => {
		if (
			![
				...Array.from(selectRef.current.children),
				...Array.from(listRef.current?.children || []),
			].includes(e.target)
		) {
			setOptionsVisibility(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleHideOptions);
		return () => {
			document.removeEventListener('click', handleHideOptions);
		};
	}, []);

	return (
		<div className={`select select_${size}`} ref={selectRef}>
			<button onClick={() => setOptionsVisibility(!optionsVisibility)}>
				{props.options.find((el) => el.value === props.value).name}
				<Icon
					name={IconNames.arrow}
					className={`select-arrow ${
						optionsVisibility ? 'select-arrow_opened' : ''
					}`}
				/>
			</button>
			{optionsVisibility && (
				<div className="select__list select-list" ref={listRef}>
					{props.options.map((el) => (
						<button
							className="select-list__option"
							key={el.id}
							onClick={() => handleSelect(el.value)}
						>
							{el.name}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default Select;
