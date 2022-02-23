import * as React from 'react';
import { useLocation } from 'react-router';

import './style.scss';

import { Icon } from '../../ui-kit';

import { AppRoutes, IconNames, PageNames } from '../../typing/enums';

const Header = () => {
	const location = useLocation();

	const PAGES_WITHOUT_HEADER: string[] = [AppRoutes.signIn, AppRoutes.signUp];

	const headerTitle = (): string => {
		switch (location.pathname) {
			case AppRoutes.applications:
				return PageNames.applications;
			case AppRoutes.search:
				return PageNames.search;
			case AppRoutes.myJobs:
				return PageNames.myJobs;
			case AppRoutes.profile:
				return PageNames.profile;
			case AppRoutes.statistics:
				return PageNames.statistics;
			case AppRoutes.messages:
				return PageNames.messages;
			case AppRoutes.settings:
				return PageNames.settings;
			case AppRoutes.recruiters:
				return PageNames.recruiters;
			default:
				return 'not found';
		}
	};

	return (
		<header
			className="header"
			hidden={PAGES_WITHOUT_HEADER.includes(location.pathname)}
		>
			<h2>{headerTitle()}</h2>
			{/* <Icon name={IconNames.notifications} /> */}
		</header>
	);
};

export default Header;
