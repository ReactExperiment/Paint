import React from 'react';
import { ItemTypes } from './constants.js';
import { DropTarget } from 'react-dnd';

const playgroundTarget = {
	hover() {

	},

	drop() {

	}
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
		return connectDropTarget(
			<div>PG</div>
		);
	}
}

Playground.propTypes = {
	isOver: React.PropTypes.bool.isRequired
};

export default DropTarget(ItemTypes.OPERATION, playgroundTarget, collect)(Playground);