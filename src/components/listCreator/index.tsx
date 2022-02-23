import React, { useState, useMemo } from 'react';

import './style.scss';

import { Button, Input, Form } from '../../ui-kit';
import ListCreatorItem from './listCreatorItem';

type ListCreatorProps = {
	list: string[];
	setList: (list: string[]) => void;
	label?: string;
	placeholder?: string;
	maxSize?: number | null;
	maxLength?: number | null;
	disabled?: boolean;
};

const ListCreator = ({
	label = '',
	placeholder = '',
	maxSize = null,
	maxLength = null,
	disabled = false,
	...props
}: ListCreatorProps) => {
	const [input, setInput] = useState<string>('');

	const addResponsibility = () => {
		props.setList([...props.list, input]);
		setInput('');
	};

	const deleteResponsibility = (listItem: string): void => {
		const newList = props.list.filter((el) => el !== listItem);
		props.setList(newList);
	};

	const isAddedeValueValid = useMemo(() => {
		return !input.length || props.list.indexOf(input) !== -1;
	}, [input]);

	return (
		<section className="list-creator">
			<Form className={`list-creator__add-form add-form`}>
				{label && <label className="add-form__label">{label}</label>}
				<div className="add-form__input-container input-container">
					<Input
						value={input}
						onChange={setInput}
						placeholder={placeholder}
						disabled={(maxSize && props.list.length === maxSize) || disabled}
						maxLength={maxLength}
						className="input-container__input"
					/>
					<Button
						title="Add"
						onClick={addResponsibility}
						disabled={
							isAddedeValueValid ||
							(maxSize && props.list.length === maxSize) ||
							disabled
						}
						className="input-container__button"
					/>
				</div>
			</Form>
			{props.list.length > 0 && (
				<ul className="list-creator__list">
					{props.list.map((el) => (
						<ListCreatorItem
							key={el}
							title={el}
							onDelete={() => deleteResponsibility(el)}
							disabled={disabled}
						/>
					))}
				</ul>
			)}
		</section>
	);
};

export default ListCreator;
