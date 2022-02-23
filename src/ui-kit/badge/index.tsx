import * as React from 'react';

import './style.scss';

import { Colors } from '../../typing/enums';

const Badge = ({
	title,
	color = Colors.color_basic_1,
	backgroundColor = Colors.color_basic_4,
}: {
	title: string;
	color?: string;
	backgroundColor?: string;
}) => {
	return (
		<span className="badge" style={{ backgroundColor, color }}>
			{title}
		</span>
	);
};

export default React.memo(Badge);
