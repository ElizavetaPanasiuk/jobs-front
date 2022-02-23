import React from 'react';

import './style.scss';

import { Forms } from '../../components';

import { Roles } from '../../typing/enums';

import { useTypedSelector } from '../../hooks';

const ProfilePage = () => {
	const userRole = useTypedSelector((state) => state.user.role);

	return (
		<div id="profile-page">
			<section className="profile-content">
				{userRole === Roles.company ? (
					<Forms.CompanyProfile />
				) : userRole === Roles.candidate ? (
					<Forms.CandidateProfile />
				) : userRole === Roles.recruiter ? (
					<Forms.RecruiterProfile />
				) : null}
			</section>
		</div>
	);
};

export default ProfilePage;
