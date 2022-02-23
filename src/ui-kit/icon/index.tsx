import * as React from 'react';

import { Colors, IconNames } from '../../typing/enums';

type IconProps = {
	name: IconNames;
	width?: number;
	height?: number;
	color?: Colors;
	className?: string;
};

const Icon = ({
	name,
	width = 24,
	height = 24,
	color = Colors.color_basic_1,
	className = '',
}: IconProps) => {
	switch (name) {
		case IconNames.arrow:
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height={height}
					viewBox="0 0 24 24"
					width={width}
					fill={color}
					className={className}
				>
					<path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
					<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
				</svg>
			);
		case IconNames.applications:
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height={height}
					viewBox="0 0 24 24"
					width={width}
					fill={color}
				>
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
				</svg>
			);
		case IconNames.check:
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height={height}
					viewBox="0 0 24 24"
					width={width}
					fill={color}
				>
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
				</svg>
			);
		case IconNames.job:
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height={height}
					viewBox="0 0 24 24"
					width={width}
					fill={color}
				>
					<path d="M0 0h24v24H0zm10 5h4v2h-4zm0 0h4v2h-4z" fill="none" />
					<path d="M10 16v-1H3.01L3 19c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2v-4h-7v1h-4zm10-9h-4.01V5l-2-2h-4l-2 2v2H4c-1.1 0-2 .9-2 2v3c0 1.11.89 2 2 2h6v-2h4v2h6c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-6 0h-4V5h4v2z" />
				</svg>
			);
		case IconNames.signOut:
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height={height}
					viewBox="0 0 24 24"
					width={width}
					fill={color}
				>
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
				</svg>
			);
		case IconNames.messages:
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height={height}
					viewBox="0 0 24 24"
					width={width}
					fill={color}
				>
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z" />
				</svg>
			);
		case IconNames.notifications:
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height={height}
					viewBox="0 0 24 24"
					width={width}
					fill={color}
				>
					<path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
				</svg>
			);
		case IconNames.profile:
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height={height}
					viewBox="0 0 24 24"
					width={width}
					fill={color}
				>
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
				</svg>
			);
		case IconNames.search:
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height={height}
					viewBox="0 0 24 24"
					width={width}
					fill={color}
				>
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
				</svg>
			);
		case IconNames.settings:
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height={height}
					viewBox="0 0 24 24"
					width={width}
					fill={color}
				>
					<rect fill="none" height="24" width="24" />
					<g>
						<path d="M17.41,6.59L15,5.5l2.41-1.09L18.5,2l1.09,2.41L22,5.5l-2.41,1.09L18.5,9L17.41,6.59z M21.28,12.72L20.5,11l-0.78,1.72 L18,13.5l1.72,0.78L20.5,16l0.78-1.72L23,13.5L21.28,12.72z M16.24,14.37l1.94,1.47l-2.5,4.33l-2.24-0.94 c-0.2,0.13-0.42,0.26-0.64,0.37L12.5,22h-5l-0.3-2.41c-0.22-0.11-0.43-0.23-0.64-0.37l-2.24,0.94l-2.5-4.33l1.94-1.47 C3.75,14.25,3.75,14.12,3.75,14s0-0.25,0.01-0.37l-1.94-1.47l2.5-4.33l2.24,0.94c0.2-0.13,0.42-0.26,0.64-0.37L7.5,6h5l0.3,2.41 c0.22,0.11,0.43,0.23,0.64,0.37l2.24-0.94l2.5,4.33l-1.94,1.47c0.01,0.12,0.01,0.24,0.01,0.37S16.25,14.25,16.24,14.37z M13,14 c0-1.66-1.34-3-3-3s-3,1.34-3,3s1.34,3,3,3S13,15.66,13,14z" />
					</g>
				</svg>
			);
		case IconNames.statistics:
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height={height}
					viewBox="0 0 24 24"
					width={width}
					fill={color}
				>
					<path d="M0 0h24v24H0V0z" fill="none" />
					<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM8 17c-.55 0-1-.45-1-1v-5c0-.55.45-1 1-1s1 .45 1 1v5c0 .55-.45 1-1 1zm4 0c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v8c0 .55-.45 1-1 1zm4 0c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1z" />
				</svg>
			);
		case IconNames.cross:
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height={height}
					viewBox="0 0 24 24"
					width={width}
					fill={color}
				>
					<path d="M0 0h24v24H0V0z" fill="none" />
					<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
				</svg>
			);
		case IconNames.people:
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height={height}
					viewBox="0 0 24 24"
					width={width}
					fill={color}
				>
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
				</svg>
			);
		default:
			return;
	}
};

export default Icon;
