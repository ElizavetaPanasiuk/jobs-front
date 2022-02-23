import React, { useState, useEffect } from 'react';

import './style.scss';

import { Button, Checkbox, Form, Loader, Range } from '../../ui-kit';

import { EmploymentTypes, LoadingStatuses } from '../../typing/enums';
import { CommonTypes } from '../../typing/types';

import { IndustriesService } from '../../service';

type JobsFilterProps = {
	industryFilter: string[];
	setIndustryFilter: (industries: string[]) => void;
	handleApplyFilters: () => void;
	minimumHourlyRateFilter: number;
	setMinimumHourlyRateFilter: (rate: number) => void;
	employmentTypeFilter: string[];
	setEmploymentTypeFilter: (employmentTypes: string[]) => void;
	minimumExperienceYearsFilter: number;
	setMinimumExperienceYearsFilter: (experience: number) => void;
	requestLoading: LoadingStatuses;
};

const employmentTypes = [
	{
		id: 1,
		employmentType: EmploymentTypes.fullTime,
	},
	{
		id: 2,
		employmentType: EmploymentTypes.partTime,
	},
	{
		id: 3,
		employmentType: EmploymentTypes.oneTime,
	},
];

const JobsFilter = (props: JobsFilterProps) => {
	const [industries, setIndustries] = useState<Array<CommonTypes.IndustryType>>(
		[]
	);
	const [loading, setLoading] = useState<boolean>(true);

	const handleCheckbox = (
		filtersArray: string[],
		value: string,
		setValue: (values: string[]) => void
	): void => {
		filtersArray.includes(value)
			? setValue(filtersArray.filter((el) => el !== value))
			: setValue([...filtersArray, value]);
	};

	const getIndustries = async () => {
		const industryList = await IndustriesService.get();

		if (industryList?.length) {
			setIndustries(industryList);
		}

		setLoading(false);
	};

	useEffect(() => {
		getIndustries();
	}, []);

	return (
		<aside className="jobs-filter">
			<Form className="jobs-filter__form">
				<h3>Filter</h3>
				{industries.length ? (
					<>
						<h4>Industry</h4>
						{industries.map((el) => (
							<Checkbox
								key={el.id}
								checked={props.industryFilter.includes(el.industryName)}
								label={el.industryName}
								id={el.id}
								onChange={() =>
									handleCheckbox(
										props.industryFilter,
										el.industryName,
										props.setIndustryFilter
									)
								}
								disabled={props.requestLoading === LoadingStatuses.loading}
							/>
						))}
						<h4>Employment Type</h4>
						{employmentTypes.map((el) => (
							<Checkbox
								key={el.id}
								checked={props.employmentTypeFilter.includes(el.employmentType)}
								label={el.employmentType}
								id={el.id}
								onChange={() =>
									handleCheckbox(
										props.employmentTypeFilter,
										el.employmentType,
										props.setEmploymentTypeFilter
									)
								}
								disabled={props.requestLoading === LoadingStatuses.loading}
							/>
						))}
						<h4>Minimum Hourly Rate</h4>
						<Range
							value={props.minimumHourlyRateFilter}
							onChange={props.setMinimumHourlyRateFilter}
							unit="$"
							unitPosition="before"
							disabled={props.requestLoading === LoadingStatuses.loading}
						/>
						<h4>Minimum Experience (years)</h4>
						<Range
							value={props.minimumExperienceYearsFilter}
							onChange={props.setMinimumExperienceYearsFilter}
							max={10}
							disabled={props.requestLoading === LoadingStatuses.loading}
						/>
						<Button
							title="Apply filters"
							onClick={props.handleApplyFilters}
							size="small"
							disabled={props.requestLoading === LoadingStatuses.loading}
						/>
					</>
				) : loading ? (
					<Loader />
				) : (
					<p>Error while getting filter values</p>
				)}
			</Form>
		</aside>
	);
};

export default React.memo(JobsFilter);
