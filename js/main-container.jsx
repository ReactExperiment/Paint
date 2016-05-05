import React from 'react';
import { Row, Col } from 'react-bootstrap';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import Playground from './playground';
import OperationButtonList from './operation-button-list';

class MainContainer extends React.Component {
	render() {
		const operationList = this.props.operationList;

		return (
			<div style={{height: '100%'}}>
				<Row style={{height: '100%'}}>
					<Col md={2} style={{height: '100%', borderRight: 'thick solid #444444'}}>
						<OperationButtonList />
					</Col>
					<Col md={10} style={{height: '100%'}}>
						<Playground style={{height: '100%'}} operationList={operationList} />
					</Col>
				</Row>
			</div>
		);
	}
}

export default DragDropContext(HTML5Backend)(MainContainer);