import React, { useState } from 'react';

import './style.scss';

import { Badge, Button, Icon, Loader, Message } from '../../ui-kit';
import { ImageMessage, Indicator, List, Modals } from '..';

import {
	ApplicationStatuses,
	IconNames,
	LoadingStatuses,
	Roles,
} from '../../typing/enums';
import {
	ICandidateInfo,
	IJobDetailedInfo,
	IRecruiterInfo,
} from '../../typing/interfaces';

import { useTypedSelector } from '../../hooks';
import { ApplicationsService } from '../../service';

interface IJobDetailedInfoWithCandidateData extends IJobDetailedInfo {
	candidateData?: ICandidateInfo;
	recruiterData?: IRecruiterInfo;
}

type CardPanelProps = {
	jobData: IJobDetailedInfoWithCandidateData;
	onClose: () => void;
	loading: LoadingStatuses;
	isApplyButtonVisible?: boolean;
	onApply?: (jobId: number, applicationId: number) => void;
	onUpdateStatus?: (applicationId: number, status: ApplicationStatuses) => void;
};

const CardPanel = ({
	isApplyButtonVisible = false,
	...props
}: CardPanelProps) => {
	const userRole = useTypedSelector((state) => state.user.role);
	const [isSubmitApplicationModalVisible, setSubmitApplicationModalVisible] =
		useState<boolean>(false);
	const [requestLoading, setRequestLoading] = useState<boolean>(false);

	const jobWithRequirements = () => {
		return props.jobData.requiredExperience !== null;
	};

	const openModal = (): void => {
		setSubmitApplicationModalVisible(true);
	};

	const closeModal = (): void => {
		setSubmitApplicationModalVisible(false);
	};

	const handleSubmit = async (letter: string) => {
		setRequestLoading(true);
		const application = await ApplicationsService.apply(
			props.jobData.id,
			letter
		);
		props.onApply(props.jobData.id, application.id);
		closeModal();
		setRequestLoading(false);
	};

	const approveApplication = async (id: number) => {
		setRequestLoading(true);
		await ApplicationsService.approve(id);
		props.onUpdateStatus(id, ApplicationStatuses.approved);
		setRequestLoading(false);
	};

	const rejectApplication = async (id: number) => {
		setRequestLoading(true);
		await ApplicationsService.reject(id);
		props.onUpdateStatus(id, ApplicationStatuses.rejected);
		setRequestLoading(false);
	};

	return (
		<>
			<section className="card-panel">
				{props.loading !== LoadingStatuses.loading && (
					<button
						className="card-panel__close-button"
						onClick={props.onClose}
						type="button"
					>
						<Icon name={IconNames.cross} />
					</button>
				)}
				{props.loading === LoadingStatuses.loading ? (
					<Loader />
				) : props.loading === LoadingStatuses.error ? (
					<ImageMessage type="error" />
				) : (
					<>
						<h3>Job Details</h3>
						<h3 className="card-panel__title">{props.jobData.jobName}</h3>
						<p className="card-panel__subtitle card-subtitle">
							<span className="card-subtitle__company-name">
								{props.jobData.companyName}
							</span>
							<Badge title={props.jobData.industryName} />
						</p>
						<div className="card-panel__indicators">
							<Indicator
								name="Employment"
								value={props.jobData.employmentType}
							/>
							<Indicator
								name="Hourly Rate"
								value={+props.jobData.hourlyRate}
								type="money"
							/>
							<Indicator
								name="Publication Date"
								value={props.jobData.createdAt}
								type="date"
							/>
						</div>
						{props.jobData.responsibilities.length > 0 && (
							<>
								<h4 className="card-panel__section-name">Responsibilities</h4>
								<List list={props.jobData.responsibilities} />
							</>
						)}
						{jobWithRequirements() && (
							<h4 className="card-panel__section-name">Requirements</h4>
						)}
						{props.jobData.requiredExperience !== null && (
							<p>
								<span>Experience </span>
								<Badge
									title={
										props.jobData.requiredExperience > 0
											? `${props.jobData.requiredExperience} ${
													props.jobData.requiredExperience === 1
														? 'year'
														: 'years'
											  }`
											: 'not required'
									}
								/>
							</p>
						)}
						{props.jobData.description && (
							<>
								<h4 className="card-panel__section-name">Job description</h4>
								<p>{props.jobData.description}</p>
							</>
						)}
						{props.jobData.candidateData && (
							<section className="card-panel__candidate-info">
								<h3>Candidate Details</h3>
								<p className="card-panel__title">
									{props.jobData.candidateData.firstName}{' '}
									{props.jobData.candidateData.lastName}
								</p>

								<div className="card-panel__indicators">
									<Indicator
										name="Phone"
										value={props.jobData.candidateData.phone}
									/>
									<Indicator
										name="Email"
										value={props.jobData.candidateData.email}
									/>
								</div>
								{props.jobData.candidateData.skills.length > 0 && (
									<>
										<h4 className="card-panel__section-name">Skills</h4>
										<List list={props.jobData.candidateData.skills} />
									</>
								)}
								{props.jobData.candidateData.softSkills.length > 0 && (
									<>
										<h4 className="card-panel__section-name">Soft skills</h4>
										<List list={props.jobData.candidateData.softSkills} />
									</>
								)}
								{props.jobData.candidateData.letter && (
									<>
										<h4 className="card-panel__section-name">Cover letter</h4>
										<Message message={props.jobData.candidateData.letter} />
									</>
								)}
							</section>
						)}
						{props.jobData.recruiterData && (
							<section className="card-panel__candidate-info">
								<h3>Recruiter Details</h3>
								<p className="card-panel__title">
									{props.jobData.recruiterData.firstName}{' '}
									{props.jobData.recruiterData.lastName}
								</p>

								<div className="card-panel__indicators">
									<Indicator
										name="Phone"
										value={props.jobData.recruiterData.phone}
									/>
									<Indicator
										name="Email"
										value={props.jobData.recruiterData.email}
									/>
								</div>
							</section>
						)}
						{isApplyButtonVisible && userRole === Roles.candidate && (
							<Button
								className="card-panel__apply-button"
								title={!props.jobData.applicationId ? 'Apply' : 'Applied'}
								size="small"
								disabled={props.jobData.applicationId !== null}
								onClick={openModal}
							/>
						)}
						{userRole === Roles.recruiter &&
							props.jobData?.candidateData?.status ===
								ApplicationStatuses.pending && (
								<div className="card-panel__apply-button">
									<Button
										title="Approve"
										size="small"
										onClick={() =>
											approveApplication(props.jobData.applicationId)
										}
									/>
									<Button
										title="Reject"
										size="small"
										onClick={() =>
											rejectApplication(props.jobData.applicationId)
										}
										outline
									/>
								</div>
							)}
					</>
				)}
			</section>
			{isSubmitApplicationModalVisible && (
				<Modals.SubmitApplication
					onClose={closeModal}
					onSubmit={handleSubmit}
					loading={requestLoading}
				/>
			)}
		</>
	);
};

export default CardPanel;
