import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { Row, Col } from 'react-bootstrap';

import Playground from './playground';
import OperationButtonList from './operation-button-list';

class MainContainer extends React.Component {
	render() {
		return (
			<div style={{height: '100%'}}>
				<Row style={{height: '100%'}}>
					<Col md={2} style={{height: '100%', borderRight: 'thick solid #444444'}}>
						<OperationButtonList />
					</Col>
					<Col md={10}>
						<Playground />
					</Col>
				</Row>
			</div>
		);
	}
}

export default DragDropContext(HTML5Backend)(MainContainer);