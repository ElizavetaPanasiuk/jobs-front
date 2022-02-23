import React from 'react';

import './style.scss';

type AvatarProps = {
	url: string;
	name: string;
};

const Avatar = (props: AvatarProps) => {
	const createLabel = (): string => {
		return props.name.trim()[0].toUpperCase();
	};

	return (
		<figure className="avatar">
			{props.url ? (
				<img src={props.url} alt="company logo" />
			) : (
				<p className="avatar__label">{createLabel()}</p>
			)}
		</figure>
	);
};

export default Avatar;
