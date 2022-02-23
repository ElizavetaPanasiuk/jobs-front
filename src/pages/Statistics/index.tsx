import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	Title,
	BarElement,
	CategoryScale,
	LinearScale,
} from 'chart.js';

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	Title,
	BarElement,
	CategoryScale,
	LinearScale
);

import './style.scss';

import { Loader } from '../../ui-kit';
import { ImageMessage, StatisticsIndicator, Tab } from '../../components';

import { Colors, LoadingStatuses } from '../../typing/enums';

import { StatisticsService } from '../../service';

type Period = 'day' | 'week' | 'month' | 'year';

const StatisticsPage = () => {
	const [dashboardData, setDashboardData] = useState(null);
	const [period, setPeriod] = useState<Period>('year');
	const [loading, setLoading] = useState<LoadingStatuses>(
		LoadingStatuses.loading
	);

	const getStatistics = async () => {
		setLoading(LoadingStatuses.loading);
		const statisticsData = await StatisticsService.get(period);
		if (statisticsData) {
			setDashboardData({
				doughnutChartData: {
					labels: statisticsData.jobsByIndustry.map(
						(el: any) => el.industryName
					),
					datasets: [
						{
							data: statisticsData.jobsByIndustry.map(
								(el: any) => el.jobsCount
							),
							backgroundColor: [
								Colors.color_diagram_1_bg,
								Colors.color_diagram_2_bg,
								Colors.color_diagram_3_bg,
							],
							borderColor: [
								Colors.color_diagram_1,
								Colors.color_diagram_2,
								Colors.color_diagram_3,
							],
							borderWidth: 1,
						},
					],
				},
				jobsCount: statisticsData.jobsCount,
				barChartData: {
					labels: statisticsData.top5CompaniesByNewJobs.map(
						(el: any) => el.companyName
					),
					datasets: [
						{
							label: 'Jobs count',
							data: statisticsData.top5CompaniesByNewJobs.map(
								(el: any) => el.jobsCount
							),
							backgroundColor: [
								Colors.color_diagram_1_bg,
								Colors.color_diagram_2_bg,
								Colors.color_diagram_3_bg,
								Colors.color_diagram_4_bg,
								Colors.color_diagram_5_bg,
							],
						},
					],
				},
			});
			setLoading(LoadingStatuses.success);
		} else {
			setLoading(LoadingStatuses.error);
		}
	};

	const handleChangeTab = (value: Period): void => {
		setPeriod(value);
	};

	useEffect(() => {
		getStatistics();
	}, [period]);

	return (
		<div id="statistics-page">
			<Tab
				tabs={[
					{ value: 'day', title: 'Day' },
					{ value: 'week', title: 'Week' },
					{ value: 'month', title: 'Month' },
					{ value: 'year', title: 'Year' },
				]}
				onChange={handleChangeTab}
				activeTab={period}
			/>
			<div className="dashboard">
				{loading === LoadingStatuses.loading ? (
					<Loader />
				) : loading === LoadingStatuses.error ? (
					<ImageMessage type="error" />
				) : (
					<>
						<div className="statisticsIndicator-container">
							<StatisticsIndicator
								value={dashboardData.jobsCount}
								title={`New jobs for the last ${period}`}
							/>
						</div>
						<div className="doughnut-container">
							<Doughnut
								data={dashboardData.doughnutChartData}
								options={{
									plugins: {
										title: {
											display: true,
											text: 'New jobs by industries',
											color: Colors.color_basic_1,
											font: {
												size: 24,
											},
										},
										legend: {
											position: 'right',
										},
									},
								}}
							/>
						</div>
						<div className="bar-container">
							<Bar
								data={dashboardData.barChartData}
								options={{
									plugins: {
										title: {
											display: true,
											text: 'Top 5 companies by jobs count',
											color: Colors.color_basic_1,
											font: {
												size: 24,
											},
										},
										legend: {
											display: false,
										},
									},
								}}
							/>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default StatisticsPage;
