import React from 'react';

import './style.scss';

import { Icon } from '../../../ui-kit';

import { Colors, IconNames } from '../../../typing/enums';

type ListCreatorItemProps = {
	title: string;
	onDelete: () => void;
	disabled?: boolean;
};

const ListCreatorItem = ({
	disabled = false,
	...props
}: ListCreatorItemProps) => {
	return (
		<li
			className={`list-creator-item ${
				disabled && 'list-creator-item_disabled'
			}`}
		>
			<span>{props.title}</span>
			<button
				onClick={props.onDelete}
				type="button"
				className="list-creator-item__button"
				disabled={disabled}
			>
				<Icon name={IconNames.cross} color={Colors.color_white_1} />
			</button>
		</li>
	);
};

export default ListCreatorItem;
