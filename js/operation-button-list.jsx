import React from 'react';

import OperationButton from './operation-button';

export default class OperationButtonList extends React.Component {
	render() {
		return (
			<div style={{padding: '5px'}}>
				<OperationButton opType="opStart" opColor="#43A047" />
				<OperationButton opType="opMid" opColor="#2196F3" />
				<OperationButton opType="opEnd" opColor="#FFC107" />
			</div>
		);
	}
}