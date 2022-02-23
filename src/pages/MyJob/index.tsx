import React, { useEffect, useState, useRef } from 'react';

import './style.scss';

import { Button, Input, Loader } from '../../ui-kit';
import { Modals, JobCard, CardPanel, ImageMessage } from '../../components';

import { LoadingStatuses, Roles } from '../../typing/enums';
import { IJobInfo } from '../../typing/interfaces';

import {
	useCashJobs,
	useDebounce,
	useTypedSelector,
	usePagination,
} from '../../hooks';
import { JobsService } from '../../service';

const MyJobsPage = () => {
	const userRole = useTypedSelector((state) => state.user.role);

	const [searchInput, setSearchInput] = useState<string>('');
	const [activeJobId, setActiveJobId] = useState<number>();
	const [isNewJobModalVisible, setNewJobModalVisible] =
		useState<boolean>(false);
	const [jobs, setJobs] = useState<Array<IJobInfo>>([]);
	const [loadingJobsList, setLoadingJobsList] = useState<LoadingStatuses>(
		LoadingStatuses.loading
	);
	const [isLast, setLast] = useState<boolean>(false);
	const [jobsCount, setJobsCount] = useState<number>();

	const scrollRef = useRef<HTMLDivElement>(null);

	const getJobs = async (page: number = 1, size: number = 10) => {
		const getUsersJobs =
			userRole === Roles.company
				? JobsService.getCompanyJobsList
				: JobsService.getRecruiterJobsList;
		const result = await getUsersJobs(page, size, searchInput);
		if (result) {
			setLast(result.isLast);
			setJobsCount(result.count);
			if (page === 1) {
				setJobs(result.data);
			} else {
				setJobs([...jobs, ...result.data]);
			}
			setLoadingJobsList(LoadingStatuses.success);
		} else {
			setLoadingJobsList(LoadingStatuses.error);
		}
	};

	const setCurrentPage = usePagination(getJobs, scrollRef, isLast);

	const getJobsDebounce = useDebounce(getJobs, 500);

	const { activeJobDetailes, loadingJobDetailed, cashJob } = useCashJobs();

	useEffect(() => {
		setLoadingJobsList(LoadingStatuses.loading);
		setCurrentPage(1);
		getJobsDebounce();
	}, [searchInput]);

	const handleChooseJob = async (id: number): Promise<void> => {
		setActiveJobId(id);
		cashJob(id);
	};

	const handleCloseCardPanel = (): void => {
		setActiveJobId(null);
	};

	const openModal = () => {
		setNewJobModalVisible(true);
	};

	const closeModal = () => {
		setNewJobModalVisible(false);
	};

	return (
		<>
			<div id="my-jobs-page">
				<section className="my-jobs-content">
					<div className="my-jobs-content__search">
						<Input
							value={searchInput}
							onChange={setSearchInput}
							placeholder="Start typing your profession"
						/>
						{userRole === 4 && <Button title="Add" onClick={openModal} />}
					</div>
					<div className="my-jobs-content__results" ref={scrollRef}>
						{loadingJobsList === LoadingStatuses.error ? (
							<ImageMessage type="error" />
						) : loadingJobsList === LoadingStatuses.loading ? (
							<Loader />
						) : jobs.length ? (
							<>
								<p>
									Matches: <strong>{jobsCount}</strong>
								</p>
								{jobs.map((job) => (
									<JobCard
										key={job.id}
										{...job}
										isActive={job.id === activeJobId}
										onClick={() =>
											activeJobId !== job.id && handleChooseJob(job.id)
										}
									/>
								))}
							</>
						) : (
							<ImageMessage title="You have no jobs" type="empty" />
						)}
					</div>
				</section>
				{activeJobId && (
					<CardPanel
						jobData={activeJobDetailes}
						onClose={handleCloseCardPanel}
						loading={loadingJobDetailed}
					/>
				)}
			</div>
			{isNewJobModalVisible && (
				<Modals.NewJob onClose={closeModal} onAdd={getJobs} />
			)}
		</>
	);
};

export default MyJobsPage;
