import React from 'react';

import './style.scss';

import { Avatar } from '../../ui-kit';

import { IRecruiterInfo } from '../../typing/interfaces';

const RecruiterCard = (props: IRecruiterInfo) => {
	return (
		<article className="recruiter-card">
			<Avatar url={props.avatarUrl} name={props.firstName} />
			<div className="recruiter-card-info">
				<h3>
					{props.firstName} {props.lastName}
				</h3>
				<p>{props.phone}</p>
				<p>{props.email}</p>
			</div>
		</article>
	);
};

export default RecruiterCard;
