import React from 'react';

import './style.scss';

type LoaderProps = {
	size?: 'small' | 'normal';
};

const Loader = ({ size = 'normal' }: LoaderProps) => {
	return (
		<div
			className={`loader-container ${
				size === 'normal' ? 'loader-container_normal' : ''
			}`}
		>
			<div className={`loader_${size}`} />
		</div>
	);
};

export default Loader;
