import React from 'react';

import './style.scss';

type ListProps = {
	list: string[];
};

const List = (props: ListProps) => {
	return (
		<ul className="list">
			{props.list.map((el) => (
				<li className="list__item list-item" key={el}>
					<span className="list-item__text">{el}</span>
				</li>
			))}
		</ul>
	);
};

export default List;
