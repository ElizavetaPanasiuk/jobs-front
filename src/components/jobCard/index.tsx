import React from 'react';

import './style.scss';

import { Avatar, Badge } from '../../ui-kit';

import { ApplicationStatuses } from '../../typing/enums';
import { IJobInfo } from '../../typing/interfaces';

interface IJobCardProps extends IJobInfo {
	isActive?: boolean;
	onClick?: () => void;
	status?: ApplicationStatuses;
	onViewMessages?: () => void;
}

const JobCard = (props: IJobCardProps) => {
	const getBadgeColor = () => {
		return props.status === ApplicationStatuses.pending
			? 'rgba(255, 206, 86, 1)'
			: props.status === ApplicationStatuses.approved
			? 'rgba(75, 192, 192, 1)'
			: props.status === ApplicationStatuses.rejected
			? 'rgba(255, 99, 132, 1)'
			: null;
	};

	const getBadgeBackground = () => {
		return props.status === ApplicationStatuses.pending
			? 'rgba(255, 206, 86, 0.2)'
			: props.status === ApplicationStatuses.approved
			? 'rgba(75, 192, 192, 0.2)'
			: props.status === ApplicationStatuses.rejected
			? 'rgba(255, 99, 132, 0.2)'
			: null;
	};

	return (
		<article
			className={`job-card${props?.isActive ? ' job-card_active' : ''}`}
			onClick={props?.onClick}
		>
			<Avatar url={props.logoUrl} name={props.companyName} />
			<section className="job-card-info">
				<div>
					<h3>{props.jobName}</h3>
					{props.status && (
						<Badge
							title={props.status}
							color={getBadgeColor()}
							backgroundColor={getBadgeBackground()}
						/>
					)}
				</div>
				<div>
					<span className="job-card-info__company-name">
						{props.companyName}
					</span>
					<Badge title={props.industryName} />
				</div>
			</section>
		</article>
	);
};

export default React.memo(JobCard);
