import React from 'react';

import './style.scss';

import { Button } from '../../ui-kit';

type Tab = {
	value: string;
	title: string;
};

type TabProps = {
	tabs: Tab[];
	onChange: (value: string) => void;
	activeTab: string;
};

const Tab = (props: TabProps) => {
	return (
		<div className="tabs">
			{props.tabs.map((el) => (
				<Button
					key={el.value}
					title={el.title}
					onClick={() =>
						props.activeTab !== el.value && props.onChange(el.value)
					}
					outline={props.activeTab !== el.value}
				/>
			))}
		</div>
	);
};

export default Tab;
