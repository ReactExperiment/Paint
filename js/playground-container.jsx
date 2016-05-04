import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import Playground from './playground';

class PlaygroundContainer extends React.Component {
	render() {
		const operationList = this.props.operationList;

		return (
			<div>
				<Playground style={{height: '100%'}} operationList={operationList} />
			</div>
		);
	}
}

export default DragDropContext(HTML5Backend)(PlaygroundContainer);