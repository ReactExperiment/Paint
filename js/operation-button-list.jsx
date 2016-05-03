import React from 'react';

import OperationButton from './operation-button';

export default class OperationButtonList extends React.Component {
	render() {
		return (
			<div style={{padding: '5px'}}>
				<OperationButton />
				<OperationButton />
				<OperationButton />
			</div>
		);
	}
}