import React from 'react';

import './style.scss';

import { beautifyMoneyInHours } from '../../utils/moneyFuncstions';
import { DateService } from '../../utils';

type IndicatorProps = {
	name: string;
	value: string | number;
	type?: 'string' | 'date' | 'money';
};

const Indicator = ({ type = 'string', ...props }: IndicatorProps) => {
	const beautifyIndicatorValue = (
		value: string | number | Date,
		type: 'string' | 'money' | 'date'
	) => {
		if (typeof props.value === 'number' && type === 'money') {
			return beautifyMoneyInHours(props.value);
		}
		if (typeof props.value === 'string' && type === 'date') {
			return DateService.beautifyDate(props.value);
		}
		return value;
	};

	return (
		<div className="indicator">
			<p className="indicator__name">{props.name}</p>
			<p className="indicator__value">
				{beautifyIndicatorValue(props.value, type)}
			</p>
		</div>
	);
};

export default Indicator;
