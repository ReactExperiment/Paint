import React from 'react';
import { ItemTypes, ConfigureConsts } from './constants';
import { DragSource, DropTarget } from 'react-dnd';
import { moveOperation, addLink } from './dispatcher';
import OperationContextMenu from './operation-context-menu';
import { ContextMenuLayer } from 'react-contextmenu';

const width = ConfigureConsts.WIDTH;
const height = ConfigureConsts.HEIGHT;
const initialPosition = {
	x: window.innerWidth/6,
	y: 10
};

/*******DropTarget Initialization*******/
const operationTarget = {
	drop(props, monitor, component) {
		return { component: component };
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
	beginDrag(props, monitor, component) {
		console.log('begin');
		return { component: component };
	},

	endDrag(props, monitor, component) {
		if (monitor.didDrop()) {
			let index_a = component.props.name;
			let index_b = monitor.getDropResult().component.props.name;
			addLink(index_a, index_b);
		} else {
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
		}
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
	    this.state.opName = props.name;

	    this.editName = this.editName.bind(this);
	}

	editName(name) {
		this.setState({opName: name});
	}

	render() {
		const { connectDragSource, connectDropTarget, isDragging, opParams } = this.props;
		const current = this.state ? false : true;
		const { x, y } = current ? initialPosition : this.state;
		const windowWidth = window.innerWidth;
		// return connectDragSource(
			// <div style={current ? {} : {
			// 	position: 'fixed',
			// 	top: y,
			// 	left: x
			// }}>
		return 	(connectDropTarget(connectDragSource(
					<div style={{
						// paddingLeft: 0,
						position: 'absolute',
						zIndex: 0,
						top: y,
						left: x - windowWidth / 6
					}}>
						<div style={{
							width: width + 'px',
							height: height + 'px',
							borderRadius: '5px',
							// ":hover": { backgroundColor: 'black' },
							backgroundColor: opParams.opColor,
							color: 'white',
							textAlign: 'center',
							lineHeight: height + 'px'
						}}>
							<span>{ opParams.opName }</span>
						</div>
					</div>
				)));
	}
}

Operation.propTypes = {
	opParams: React.PropTypes.shape({
		opType: React.PropTypes.string.isRequired,
		opColor: React.PropTypes.string.isRequired
	}),
	connectDragSource: React.PropTypes.func.isRequired,
	isDragging: React.PropTypes.bool.isRequired
};

// Operation = ContextMenuLayer(ItemTypes.OPERATION)(Operation);
Operation = DragSource(ItemTypes.OPERATION, operationSource, sourceCollect)(Operation);
Operation = DropTarget(ItemTypes.OPERATION, operationTarget, targetCollect)(Operation);
Operation = ContextMenuLayer(ItemTypes.OPERATION, (props) => ({ opParams: props.opParams }))(Operation);

export default Operation;
