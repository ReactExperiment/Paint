import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import Playground from './playground';
import Operation from './operation';

class MainContainer extends React.Component {
	render() {
		return (
			<div>MC<Playground />MC<Operation />MC</div>
		);
	}
}

export default DragDropContext(HTML5Backend)(MainContainer);