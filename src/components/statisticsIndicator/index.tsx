import React from 'react';

import './style.scss';

type StatisticsIndicatorProps = {
	value: number;
	title: string;
};

const StatisticsIndicator = (props: StatisticsIndicatorProps) => {
	return (
		<div className="statistics-indicator">
			<p className="statistics-indicator__value">{props.value}</p>
			<p className="statistics-indicator__title">{props.title}</p>
		</div>
	);
};

export default StatisticsIndicator;
