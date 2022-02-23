import { useState } from 'react';

import { LoadingStatuses } from '../typing/enums';
import { IJobDetailedInfo } from '../typing/interfaces';

import { ApplicationsService, JobsService } from '../service';

const useCashJobs = (
	withCandidateData: boolean = false,
	withRecruiterData: boolean = false
) => {
	const [cashedJobsDetailed, setCashedJobsDetailed] = useState<{
		[key: number]: IJobDetailedInfo;
	}>({});
	const [activeJobDetailes, setActiveJobDetailes] =
		useState<IJobDetailedInfo>();
	const [loadingJobDetailed, setLoadingJobDetailed] = useState<LoadingStatuses>(
		LoadingStatuses.loading
	);

	const cashJob = async (
		jobId: number,
		applicationId: number = null
	): Promise<void> => {
		const activeJobInCash = cashedJobsDetailed[jobId];

		if (activeJobInCash) {
			setActiveJobDetailes(activeJobInCash);
		} else {
			setLoadingJobDetailed(LoadingStatuses.loading);
			let activeJobData = await JobsService.getJobById(jobId);

			if (activeJobData) {
			}

			if (withCandidateData) {
				const candidateData =
					await ApplicationsService.getApplicationCandidateData(applicationId);
				activeJobData = {
					...activeJobData,
					candidateData,
				};
			}

			if (withRecruiterData) {
				const recruiterData = await JobsService.getJobRecruiterData(jobId);
				activeJobData = {
					...activeJobData,
					recruiterData,
				};
			}

			if (activeJobData) {
				setCashedJobsDetailed({
					...cashedJobsDetailed,
					[activeJobData.id]: activeJobData,
				});
			}

			if (activeJobData) {
				setActiveJobDetailes(activeJobData);
				setLoadingJobDetailed(LoadingStatuses.success);
			} else {
				setLoadingJobDetailed(LoadingStatuses.error);
			}
		}
	};

	const updateDetailedJob = (jobId: number, applicationId: number): void => {
		setActiveJobDetailes({ ...activeJobDetailes, applicationId });
		setCashedJobsDetailed({
			...cashedJobsDetailed,
			[jobId]: {
				...activeJobDetailes,
				applicationId,
			},
		});
	};

	return { activeJobDetailes, loadingJobDetailed, cashJob, updateDetailedJob };
};

export default useCashJobs;
