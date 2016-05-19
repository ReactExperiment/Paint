import React from 'react';
import { Rectangle } from 'react-shapes';
import { ItemTypes } from './constants';
import { DragSource, DropTarget } from 'react-dnd';
import { moveOperation } from './dispatcher';
import { ContextMenuLayer } from 'react-contextmenu';

const width = 50;
const height = 30;
const initialPosition = {
	x: window.innerWidth/6,
	y: 10
};

/*******DropTarget Initialization*******/
const operationTarget = {
	drop() {
		return {result: "success"};
	},
	hover() {
		console.log("hover");
	}
};

function targetCollect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	};
}

/*******DragSource Initialization*******/
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

function sourceCollect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
		getInitialClientOffset: monitor.getInitialClientOffset()
	};
}

/********Operation Class Defination*******/
class Operation extends React.Component {
	constructor(props) {
		super(props);
	    this.state = initialPosition;
	}

	render() {
		const { connectDragSource, isDragging } = this.props;
		const current = this.state ? false : true;
		const { x, y } = current ? initialPosition : this.state;
		const windowWidth = window.innerWidth;
		return connectDragSource(
			// <div style={current ? {} : {
			// 	position: 'fixed',
			// 	top: y,
			// 	left: x
			// }}>
			<div style={{
				// paddingLeft: 0,
				position: 'absolute',
				zIndex: 10,
				top: y,
				left: x - windowWidth / 6
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

// Operation = ContextMenuLayer(ItemTypes.OPERATION)(Operation);
Operation = DragSource(ItemTypes.OPERATION, operationSource, sourceCollect)(Operation);
Operation = ContextMenuLayer(ItemTypes.OPERATION)(Operation);
// Operation = DropTarget(ItemTypes.OPERATION, operationTarget, targetCollect)(Operation);

export default Operation;
