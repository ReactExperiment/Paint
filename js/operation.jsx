import React from 'react';
import { Button } from 'react-bootstrap';
import { ItemTypes } from './constants.js';
import { DragSource } from 'react-dnd';

const operationSource = {
	beginDrag(props) {
		console.log('begin');
		return {};
	},

	endDrag(props, monitor, component) {
		let { x, y } = monitor.getSourceClientOffset();
		if (component) {
			component.setState({
				x: x,
				y: y
			})
		}
		console.log('end');
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
		const initial = this.state ? false : true;
		const { x, y } = initial ? {} : this.state;

		return connectDragSource(
			<div style={initial ? {} : {
				position: 'fixed',
				top: y,
				left: x
			}}>
				<Button>{this.props.name}</Button>
			</div>
		);
	}
}

Operation.propTypes = {
	connectDragSource: React.PropTypes.func.isRequired,
	isDragging: React.PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.OPERATION, operationSource, collect)(Operation);
