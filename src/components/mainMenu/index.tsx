import React, { FC, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import './style.scss';

import { Icon } from '../../ui-kit';

import {
	AppRoutes,
	Colors,
	IconNames,
	PageNames,
	Roles,
} from '../../typing/enums';

import { signOut } from '../../store/asyncActions';
import { useTypedSelector } from '../../hooks';

const MainMenu: FC = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isAuth = useTypedSelector((state) => state.auth.isAuth);
	const userRole = useTypedSelector((state) => state.user.role);

	const NAV_ITEMS = [
		{
			id: 1,
			to: AppRoutes.profile,
			title: PageNames.profile,
			icon: IconNames.profile,
		},
		{
			id: 2,
			to: AppRoutes.search,
			title: PageNames.search,
			icon: IconNames.search,
		},
		{
			id: 3,
			to: AppRoutes.myJobs,
			title: PageNames.myJobs,
			icon: IconNames.job,
			excludedRoles: [Roles.candidate],
		},
		{
			id: 4,
			to: AppRoutes.applications,
			title: PageNames.applications,
			icon: IconNames.applications,
		},
		{
			id: 5,
			to: AppRoutes.recruiters,
			title: PageNames.recruiters,
			icon: IconNames.people,
			excludedRoles: [Roles.candidate, Roles.recruiter],
		},
		{
			id: 6,
			to: AppRoutes.statistics,
			title: PageNames.statistics,
			icon: IconNames.statistics,
		},
	];

	const PAGES_WITHOUT_MENU: string[] = [AppRoutes.signIn, AppRoutes.signUp];

	const handleSignOut = () => {
		dispatch(signOut());
	};

	useEffect(() => {
		if (!isAuth) {
			navigate(AppRoutes.signIn);
		}
	}, [isAuth]);

	return (
		<aside
			className="main-menu"
			hidden={PAGES_WITHOUT_MENU.includes(location.pathname)}
		>
			<p className="main-menu__logo">jobs</p>
			<nav className="main-menu__navigation main-menu-navigaton">
				<div className="links">
					{NAV_ITEMS.map(
						(el) =>
							!el.excludedRoles?.includes(userRole) && (
								<NavLink
									key={el.id}
									to={el.to}
									className={({ isActive }) =>
										isActive ? 'links__item links__item_active' : 'links__item'
									}
								>
									{({ isActive }) => (
										<>
											<Icon
												name={el.icon}
												color={
													isActive ? Colors.color_basic_6 : Colors.color_white_1
												}
											/>
											<p>{el.title}</p>
										</>
									)}
								</NavLink>
							)
					)}
				</div>
				<div className="links">
					{/*<NavLink
						to={AppRoutes.settings}
						className={({ isActive }) =>
							isActive ? 'links__item links__item_active' : 'links__item'
						}
					>
						{({ isActive }) => (
							<Icon
								name={IconNames.settings}
								color={isActive ? Colors.color_basic_6 : Colors.color_white_1}
							/>
						)}
					</NavLink> */}
					<button className="links__sign-out" onClick={handleSignOut}>
						<Icon name={IconNames.signOut} color={Colors.color_white_1} />
					</button>
				</div>
			</nav>
		</aside>
	);
};

export default MainMenu;
