import React, { useEffect, useState } from 'react';

import { Input, Loader, Select, Textarea, Range } from '../../../ui-kit';
import { ListCreator, ModalForm } from '../..';

import { EmploymentTypes, LoadingStatuses } from '../../../typing/enums';

import { useValidateForm } from '../../../hooks';
import { IndustriesService, JobsService } from '../../../service';

type NewJobModalProps = {
	onClose: () => void;
	onAdd: () => void;
};

const VALIDATION_RULES: {
	[key: string]: [(value: string) => boolean, string][];
} = {
	jobName: [[(s: string) => s.length > 0, 'The field is required']],
};

const NewJobModal = (props: NewJobModalProps) => {
	const [jobName, setJobName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [requiredExperience, setRequiredexperience] = useState<number>(0);
	const [hourlyRate, setHourlyRate] = useState<string>('');
	const [employmentType, setEmploymentType] = useState<string>(
		EmploymentTypes.fullTime
	);
	const [responsibilities, setResponsibilities] = useState<Array<string>>([]);
	const [industryId, setIndustryId] = useState<string | null>(null);
	const [industries, setIndustries] = useState([]);
	const [loading, setLoading] = useState(LoadingStatuses.loading);
	const [requestLoading, setRequestLoading] = useState<boolean>(false);
	const { isFormValid, formValidation } = useValidateForm(VALIDATION_RULES, [
		{
			state: jobName,
			name: 'jobName',
		},
	]);

	const handleSubmit = async () => {
		setRequestLoading(true);
		await JobsService.create({
			jobName: jobName,
			description: description,
			requiredExperience: requiredExperience,
			hourlyRate: +hourlyRate,
			employmentType: employmentType,
			responsibilities: responsibilities,
			industryId: +industryId,
		});
		props.onAdd();
		props.onClose();
		setRequestLoading(false);
	};

	const getIndustries = async () => {
		const result = await IndustriesService.get();
		if (result) {
			setIndustries(
				result.map((el: any) => ({
					id: el.id,
					name: el.industryName,
					value: el.id.toString(),
				}))
			);
			setIndustryId(result[0].id.toString());
			setLoading(LoadingStatuses.success);
		} else {
			setLoading(LoadingStatuses.error);
		}
	};

	useEffect(() => {
		getIndustries();
	}, []);

	return (
		<ModalForm
			modalName="New job"
			onSubmit={handleSubmit}
			onClose={props.onClose}
			isDataValid={isFormValid}
			requestLoading={requestLoading}
		>
			{loading === LoadingStatuses.loading ? (
				<Loader />
			) : loading === LoadingStatuses.error ? (
				<p>Error while getting industries</p>
			) : (
				<>
					<Input
						value={jobName}
						onChange={setJobName}
						placeholder="Job Name"
						maxLength={56}
						isValid={formValidation.jobName?.isValid}
						validationMessage={formValidation.jobName?.validationMessage}
					/>
					<Textarea
						value={description}
						onChange={setDescription}
						placeholder="Job description"
						maxLength={255}
					/>
					<Range
						value={requiredExperience}
						onChange={setRequiredexperience}
						label="Required experience"
					/>
					<Input
						value={hourlyRate}
						onChange={setHourlyRate}
						type="money"
						placeholder="Hourly rate (format: 14.4)"
					/>
					<Select
						options={[
							{
								id: 1,
								value: EmploymentTypes.fullTime,
								name: EmploymentTypes.fullTime,
							},
							{
								id: 2,
								value: EmploymentTypes.partTime,
								name: EmploymentTypes.partTime,
							},
							{
								id: 3,
								value: EmploymentTypes.oneTime,
								name: EmploymentTypes.oneTime,
							},
						]}
						value={employmentType}
						onChange={setEmploymentType}
					/>
					<Select
						options={industries}
						value={industryId}
						onChange={setIndustryId}
					/>
					<ListCreator
						list={responsibilities}
						setList={setResponsibilities}
						maxLength={255}
					/>
				</>
			)}
		</ModalForm>
	);
};

export default NewJobModal;
