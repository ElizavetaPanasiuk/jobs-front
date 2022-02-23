import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import * as Pages from '../pages';

import { AppRoutes, Roles } from '../typing/enums';

import { useTypedSelector } from '../hooks';

const AppRouting = () => {
	const isAuth: boolean = useTypedSelector((state) => state.auth.isAuth);
	const userRole = useTypedSelector((state) => state.user.role);

	return (
		<Routes>
			<Route
				path={AppRoutes.signIn}
				element={!isAuth ? <Pages.Auth /> : <Navigate to={AppRoutes.search} />}
			/>
			<Route
				path={AppRoutes.signUp}
				element={
					!isAuth ? <Pages.Registration /> : <Navigate to={AppRoutes.search} />
				}
			/>
			<Route
				path="/"
				element={
					isAuth ? (
						<Navigate to={AppRoutes.search} />
					) : (
						<Navigate to={AppRoutes.signIn} />
					)
				}
			/>
			<Route
				path={AppRoutes.search}
				element={isAuth ? <Pages.Search /> : <Navigate to={AppRoutes.signIn} />}
			/>
			<Route
				path={AppRoutes.profile}
				element={
					isAuth ? <Pages.Profile /> : <Navigate to={AppRoutes.signIn} />
				}
			/>
			<Route
				path={AppRoutes.myJobs}
				element={
					isAuth &&
					(userRole === Roles.company || userRole === Roles.recruiter) ? (
						<Pages.MyJobs />
					) : isAuth ? (
						<Navigate to={AppRoutes.search} />
					) : (
						<Navigate to={AppRoutes.signIn} />
					)
				}
			/>
			<Route
				path={AppRoutes.statistics}
				element={
					isAuth ? <Pages.Statistics /> : <Navigate to={AppRoutes.signIn} />
				}
			/>
			<Route
				path={AppRoutes.applications}
				element={
					isAuth ? <Pages.Applications /> : <Navigate to={AppRoutes.signIn} />
				}
			/>
			<Route
				path={AppRoutes.recruiters}
				element={
					isAuth && userRole === Roles.company ? (
						<Pages.Recruiters />
					) : isAuth ? (
						<Navigate to={AppRoutes.search} />
					) : (
						<Navigate to={AppRoutes.signIn} />
					)
				}
			/>
		</Routes>
	);
};

export default AppRouting;
