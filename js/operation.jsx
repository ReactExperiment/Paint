import React from 'react';
import { ItemTypes } from './constants.js';
import { DragSource } from 'react-dnd';

const operationSource = {
	beginDrag(props) {

	},

	endDrag() {

	}
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
}

class Operation extends React.Component {
	render() {
		const { connectDragSource, isDragging } = this.props;

		return connectDragSource(
			<div>OP</div>
		);
	}
}

Operation.propTypes = {
	connectDragSource: React.PropTypes.func.isRequired,
	isDragging: React.PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.OPERATION, operationSource, collect)(Operation);
