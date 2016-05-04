import React from 'react';
import { ItemTypes } from './constants.js';
import { DropTarget } from 'react-dnd';
import Operation from './operation';

const playgroundTarget = {
	
};

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	};
}

class Playground extends React.Component {
	render() {
		const { connectDropTarget, isOver } = this.props;
		let ops = [];
		for (let i = 0; i < this.props.operationList.length; i++) {
			ops.push(<Operation key={i} name={i}/>);
		}

		return connectDropTarget(
			<div>
				{ops}
			</div>
		);
	}
}

Playground.propTypes = {
	isOver: React.PropTypes.bool.isRequired
};

export default DropTarget(ItemTypes.OPERATION, playgroundTarget, collect)(Playground);