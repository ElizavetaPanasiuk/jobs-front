import React, { useRef, useMemo } from 'react';

import './style.scss';

type rangeProps = {
	value: number;
	onChange: (e: number) => void;
	unit?: string;
	unitPosition?: 'after' | 'before';
	min?: number;
	max?: number;
	disabled?: boolean;
	label?: string;
};

const Range = ({
	unit = '',
	unitPosition = 'after',
	min = 0,
	max = 100,
	disabled = false,
	label = '',
	...props
}: rangeProps) => {
	const rangeRef = useRef(null);
	const indicatorRef = useRef<HTMLInputElement>(null);

	const handleChangeRange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		props.onChange(+e.target.value);
	};

	const getIndicatorPosition = useMemo<number>(() => {
		return (
			(rangeRef.current?.clientWidth / (max - min)) * props.value -
			indicatorRef.current?.clientWidth *
				(((rangeRef.current?.clientWidth / (max - min)) * props.value) /
					rangeRef.current?.clientWidth)
		);
	}, [props.value]);

	const getIndicator = () => {
		if (!unit) {
			return props.value;
		}
		if (unitPosition === 'after') {
			return `${props.value} ${unit}`;
		}
		return `${unit} ${props.value}`;
	};

	return (
		<div className="range">
			<label className="range__label">{label}</label>
			<span
				className="range__indicator"
				style={{ left: getIndicatorPosition }}
				ref={indicatorRef}
			>
				{getIndicator()}
			</span>
			<input
				className="range__input"
				value={props.value}
				onChange={handleChangeRange}
				type="range"
				min={min}
				max={max}
				ref={rangeRef}
				disabled={disabled}
			/>
		</div>
	);
};

export default Range;
