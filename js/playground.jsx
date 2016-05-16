import React from 'react';
import { ItemTypes } from './constants.js';
import { DropTarget } from 'react-dnd';
import Operation from './operation';
import Link from './link';
import OperationContextMenu from './operationContextMenu';

const playgroundTarget = {
	drop() {
		console.log("pg");
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
		const opList = this.props.operationList;
		let ops = [];
		for (let i = 0; i < opList.length; i++) {
			ops.push(<Operation key={i} name={i} />);
		}

		// let links = [];
		let link = null;
		if (opList.length >= 2) {
			link = <Link start={{ x:opList[0].x, y:opList[0].y }} end={{ x:opList[1].x, y:opList[1].y }} />;
		}

		return connectDropTarget(
			<div style={{display: 'inline-block', height: 0, width: 0}}>
				{ops}
				{link}
				<OperationContextMenu />
			</div>
		);
	}
}

Playground.propTypes = {
	isOver: React.PropTypes.bool.isRequired
};

export default DropTarget(ItemTypes.OPERATION, playgroundTarget, collect)(Playground);