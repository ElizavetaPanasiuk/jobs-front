import React, { useEffect, useState, useRef } from 'react';

import './style.scss';

import { Loader } from '../../ui-kit';
import {
	ApplicationCard,
	CardPanel,
	JobCard,
	ImageMessage,
} from '../../components';

import {
	ApplicationStatuses,
	LoadingStatuses,
	Roles,
} from '../../typing/enums';

import { useCashJobs, useTypedSelector, usePagination } from '../../hooks';
import { ApplicationsService } from '../../service';

const ApplicationsPage = () => {
	const userRole = useTypedSelector((state) => state.user.role);

	const [loadingApplicationsList, setLoadingApplicationsList] =
		useState<LoadingStatuses>(LoadingStatuses.loading);
	const [applicationsCount, setApplicationsCount] = useState<number>();
	const [applications, setApplications] = useState([]);
	const [activeCardId, setActiveCardId] = useState<number>();
	const [isLast, setLast] = useState<boolean>(false);
	const scrollRef = useRef<HTMLDivElement>(null);

	const getApplications = async (page: number = 1, size: number = 10) => {
		const result = await ApplicationsService.getAll(page, size);
		if (result) {
			setLast(result.isLast);
			setApplicationsCount(result.count);

			if (page === 1) {
				setApplications(result.data);
			} else {
				setApplications([...applications, ...result.data]);
			}

			setLoadingApplicationsList(LoadingStatuses.success);
		} else {
			setLoadingApplicationsList(LoadingStatuses.error);
		}
	};

	const updateApplicationWithStatus = (
		applicationId: number,
		newStatus: ApplicationStatuses
	) => {
		const newApplications = applications.map((el) =>
			el.id == applicationId
				? {
						...el,
						status: newStatus,
				  }
				: el
		);
		setApplications(newApplications);
	};

	const setCurrentPage = usePagination(getApplications, scrollRef, isLast);

	const { activeJobDetailes, loadingJobDetailed, cashJob } = useCashJobs(
		true,
		userRole === Roles.company || userRole === Roles.candidate
	);

	const handleCloseCardPanel = (): void => {
		setActiveCardId(null);
	};

	const handleChooseApplication = async (
		jobId: number,
		applicationId: number = null
	): Promise<void> => {
		setActiveCardId(jobId);
		cashJob(jobId, applicationId);
	};

	useEffect(() => {
		setLoadingApplicationsList(LoadingStatuses.loading);
		setCurrentPage(1);
		getApplications(1);
	}, []);

	return (
		<div id="applications-page">
			<section className="applications-content" ref={scrollRef}>
				{loadingApplicationsList === LoadingStatuses.error ? (
					<ImageMessage type="error" />
				) : loadingApplicationsList === LoadingStatuses.loading ? (
					<Loader />
				) : applications.length ? (
					<>
						<p>
							Your applications: <strong>{applicationsCount}</strong>
						</p>
						{applications.map((application) =>
							userRole === Roles.candidate ? (
								<JobCard
									key={application.id}
									{...application}
									isActive={application.jobId === activeCardId}
									onClick={() =>
										activeCardId !== application.id &&
										handleChooseApplication(application.jobId)
									}
									withApplicationStatus={true}
								/>
							) : (
								<ApplicationCard
									key={application.id}
									{...application}
									isActive={application.jobId === activeCardId}
									onClick={() =>
										activeCardId !== application.id &&
										handleChooseApplication(application.jobId, application.id)
									}
									withApplicationStatus={true}
								/>
							)
						)}
					</>
				) : (
					<ImageMessage title="You don't have applications" type="empty" />
				)}
			</section>
			{activeCardId && (
				<CardPanel
					jobData={activeJobDetailes}
					onClose={handleCloseCardPanel}
					loading={loadingJobDetailed}
					onUpdateStatus={updateApplicationWithStatus}
				/>
			)}
		</div>
	);
};

export default ApplicationsPage;
