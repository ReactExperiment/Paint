import React from 'react';
import { ItemTypes } from './constants.js';
import { DropTarget } from 'react-dnd';
import Operation from './operation';
import Link from './link';

const playgroundTarget = {
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
		const operationList = this.props.operationList;
		const linkList = this.props.linkList;
		let ops = [];
		for (let i = 0; i < operationList.length; i++) {
			ops.push(<Operation opParams={{ opType: operationList[i].opType, opColor: operationList[i].opColor }} key={i} name={i} />);
		}

		// let links = [];
		let links = [];
		// if (opList.length >= 2) {
		// 	for (let i = 0; i < opList.length - 1; i++) {
		// 		links.push(<Link key={i} start={{ x:operationList[i].x, y:operationList[i].y }} end={{ x:operationList[i + 1].x, y:operationList[i + 1].y }} />);
		// 	}
		// }
		for (let i = 0; i < linkList.length; i++) {
			let a = linkList[i].a;
			let b = linkList[i].b;
			links.push(<Link key={i} start={{ x:operationList[a].x, y:operationList[a].y }} end={{ x:operationList[b].x, y:operationList[b].y }} />);
		}

		return connectDropTarget(
			<div style={{display: 'inline-block', height: 0, width: 0, position: 'absolute'}}>
				{ops}
				{links}
			</div>
		);
	}
}

Playground.propTypes = {
	isOver: React.PropTypes.bool.isRequired
};

export default DropTarget(ItemTypes.OPERATION, playgroundTarget, collect)(Playground);