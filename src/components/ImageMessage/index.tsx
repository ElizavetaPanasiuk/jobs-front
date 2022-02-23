import React from 'react';
import './style.scss';

type ImageMessageProps = {
	type: 'empty' | 'error';
	title?: string;
};

const ImageMessage = ({ title = '', ...props }: ImageMessageProps) => {
	return (
		<figure className="image-message">
			<img
				src={props.type === 'empty' ? '/assets/empty.png' : '/assets/error.png'}
				alt={props.type}
				className="image-message__image"
			/>
			<figcaption className="image-message__title">{title}</figcaption>
		</figure>
	);
};

export default ImageMessage;
