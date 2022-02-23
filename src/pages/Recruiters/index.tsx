import React, { useEffect, useState } from 'react';
import { LoadingStatuses } from '../../typing/enums';

import './style.scss';

import { Loader } from '../../ui-kit';
import { ImageMessage, RecruiterCard } from '../../components';

import { IRecruiterInfo } from '../../typing/interfaces';

import { RecruitersService } from '../../service';

const RecruitersPage = () => {
	const [recruiters, setRecruiters] = useState<Array<IRecruiterInfo>>([]);
	const [loading, setLoading] = useState<LoadingStatuses>(
		LoadingStatuses.loading
	);

	const getRecruiters = async () => {
		const result = await RecruitersService.get();

		if (result) {
			setRecruiters(result);
			setLoading(LoadingStatuses.success);
		} else {
			setLoading(LoadingStatuses.error);
		}
	};

	useEffect(() => {
		getRecruiters();
	}, []);

	return (
		<div id="recruiters-page">
			{loading === LoadingStatuses.loading ? (
				<Loader />
			) : loading === LoadingStatuses.error ? (
				<ImageMessage type="error" />
			) : recruiters.length ? (
				recruiters.map((recruiter) => (
					<RecruiterCard key={recruiter.id} {...recruiter} />
				))
			) : (
				<ImageMessage type="empty" title="You don't have recruiters" />
			)}
		</div>
	);
};

export default RecruitersPage;
