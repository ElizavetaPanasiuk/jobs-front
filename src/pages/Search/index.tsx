import React, { useCallback, useEffect, useRef, useState } from 'react';

import './style.scss';

import { Input, Loader } from '../../ui-kit';
import { JobCard, CardPanel, JobsFilter, ImageMessage } from '../../components';

import { LoadingStatuses } from '../../typing/enums';
import { IJobInfo } from '../../typing/interfaces';

import { useCashJobs, useDebounce, usePagination } from '../../hooks';
import { JobsService } from '../../service';

const SearchPage = () => {
	const [jobs, setJobs] = useState<Array<IJobInfo>>([]);
	const [activeJobId, setActiveJobId] = useState<number | null>();
	const [searchInput, setSearchInput] = useState<string>('');
	const [industryFilter, setIndustryFilter] = useState<Array<string>>([]);
	const [minimumHourlyRateFilter, setMinimumHourlyRateFilter] =
		useState<number>(0);
	const [minimumExperienceYearsFilter, setMinimumExperienceYearsFilter] =
		useState<number>(0);
	const [employmentTypeFilter, setEmploymentTypeFilter] = useState<
		Array<string>
	>([]);
	const [loadingJobsList, setLoadingJobsList] = useState<LoadingStatuses>(
		LoadingStatuses.loading
	);
	const [isLast, setLast] = useState<boolean>(false);
	const [jobsCount, setJobsCount] = useState<number>();

	const scrollRef = useRef<HTMLDivElement>(null);

	const getJobs = async (page: number = 1, size: number = 10) => {
		const result = await JobsService.getJobsList(
			page,
			size,
			searchInput,
			industryFilter,
			employmentTypeFilter,
			minimumHourlyRateFilter,
			minimumExperienceYearsFilter
		);
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

	const { activeJobDetailes, loadingJobDetailed, cashJob, updateDetailedJob } =
		useCashJobs();

	const handleChooseJob = async (id: number): Promise<void> => {
		setActiveJobId(id);
		cashJob(id);
	};

	const handleCloseCardPanel = (): void => {
		setActiveJobId(null);
	};

	// useCallback is used for escaping rerendering of JobsFilter because of function creation on each state change
	const handleApplyFilters = useCallback(() => {
		setLoadingJobsList(LoadingStatuses.loading);
		setActiveJobId(null);
		getJobs();
	}, [
		industryFilter,
		minimumExperienceYearsFilter,
		minimumHourlyRateFilter,
		employmentTypeFilter,
	]);

	useEffect(() => {
		setLoadingJobsList(LoadingStatuses.loading);
		setCurrentPage(1);
		getJobsDebounce();
	}, [searchInput]);

	return (
		<div id="search-page">
			<JobsFilter
				industryFilter={industryFilter}
				setIndustryFilter={setIndustryFilter}
				minimumHourlyRateFilter={minimumHourlyRateFilter}
				setMinimumHourlyRateFilter={setMinimumHourlyRateFilter}
				employmentTypeFilter={employmentTypeFilter}
				setEmploymentTypeFilter={setEmploymentTypeFilter}
				minimumExperienceYearsFilter={minimumExperienceYearsFilter}
				setMinimumExperienceYearsFilter={setMinimumExperienceYearsFilter}
				handleApplyFilters={handleApplyFilters}
				requestLoading={loadingJobsList}
			/>
			<section className="search-content">
				<Input
					value={searchInput}
					onChange={setSearchInput}
					placeholder="Start typing your profession"
				/>
				<div className="search-content__results" ref={scrollRef}>
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
						<ImageMessage
							title="There are no jobs appropriating your parameters"
							type="empty"
						/>
					)}
				</div>
			</section>
			{activeJobId && (
				<CardPanel
					jobData={activeJobDetailes}
					onClose={handleCloseCardPanel}
					loading={loadingJobDetailed}
					isApplyButtonVisible={true}
					onApply={updateDetailedJob}
				/>
			)}
		</div>
	);
};

export default SearchPage;
