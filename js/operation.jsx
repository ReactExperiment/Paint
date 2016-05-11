import React from 'react';
import { Rectangle } from 'react-shapes';
import { ItemTypes } from './constants';
import { DragSource } from 'react-dnd';
import { moveOperation } from './dispatcher';

const width = 60;
const height = 36;
const initialPosition = {
	x: 210,
	y: 10
};


const operationSource = {
	beginDrag(props) {
		console.log('begin');
		return {};
	},

	endDrag(props, monitor, component) {
		if (monitor.getSourceClientOffset()) {
			let { x, y } = monitor.getSourceClientOffset();
			if (component) {
				component.setState({
					x: x,
					y: y
				});
			}
		}
		moveOperation(component.props.name, component.state);
		console.log('end');
	}
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
		getInitialClientOffset: monitor.getInitialClientOffset()
	};
}

class Operation extends React.Component {
	constructor(props) {
		super(props);
	    this.state = initialPosition;
	}

	render() {
		const { connectDragSource, isDragging, getInitialClientOffset } = this.props;
		const current = this.state ? false : true;
		const { x, y } = current ? initialPosition : this.state;
		console.log(this);

		return connectDragSource(
			// <div style={current ? {} : {
			// 	position: 'fixed',
			// 	top: y,
			// 	left: x
			// }}>
			<div style={{
				position: 'fixed',
				top: y,
				left: x,
				zIndex: 1
			}}>
				<Rectangle width={width} height={height} fill={{color:'#EEEEEE'}} stroke={{color:'#E65243'}} strokeWidth={3} />
			</div>
		);
	}
}

Operation.propTypes = {
	connectDragSource: React.PropTypes.func.isRequired,
	isDragging: React.PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.OPERATION, operationSource, collect)(Operation);
