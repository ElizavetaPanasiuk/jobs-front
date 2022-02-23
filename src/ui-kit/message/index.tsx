import React from 'react';

import './style.scss';

type MessageProps = {
	message: string;
};

const Message = ({ message }: MessageProps) => {
	return <article className="message">{message}</article>;
};

export default Message;
