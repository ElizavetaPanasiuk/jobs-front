import React from 'react';

import './style.scss';

import { Avatar, Badge } from '../../ui-kit';

import { ApplicationStatuses, Colors } from '../../typing/enums';
import { IApplicationInfo } from '../../typing/interfaces';

interface IApplicationCardProps extends IApplicationInfo {
	isActive?: boolean;
	onClick?: () => void;
}

const ApplicationCard = ({
	isActive = false,
	...props
}: IApplicationCardProps) => {
	const getBadgeColor = () => {
		return props.status === ApplicationStatuses.pending
			? Colors.color_status_badge_pending
			: props.status === ApplicationStatuses.approved
			? Colors.color_status_badge_approved
			: props.status === ApplicationStatuses.rejected
			? Colors.color_status_badge_rejected
			: null;
	};

	const getBadgeBackground = () => {
		return props.status === ApplicationStatuses.pending
			? Colors.color_status_badge_pending_bg
			: props.status === ApplicationStatuses.approved
			? Colors.color_status_badge_approved_bg
			: props.status === ApplicationStatuses.rejected
			? Colors.color_status_badge_rejected_bg
			: null;
	};

	return (
		<article
			className={`application-card${
				isActive ? ' application-card_active' : ''
			}`}
			onClick={props.onClick}
		>
			<Avatar url="" name={props.candidateFirstName} />
			<section className="application-card-info">
				<div>
					<h3>
						{props.candidateFirstName} {props.candidateLastName}
					</h3>
					{props.status && (
						<Badge
							title={props.status}
							color={getBadgeColor()}
							backgroundColor={getBadgeBackground()}
						/>
					)}
				</div>
				<div>Vacancy: {props.jobName}</div>
			</section>
		</article>
	);
};

export default React.memo(ApplicationCard);
