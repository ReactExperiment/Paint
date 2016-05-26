import React from "react";
import ReactDOM from "react-dom";
import { ContextMenu, MenuItem, connect } from "react-contextmenu";
import { ItemTypes } from "./constants"

import Modal from "react-modal";
import { Row, Col } from "react-bootstrap";

const customStyles = {
	content : {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	}
};

class OperationContextMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {modalIsOpen: false};

		this.openPropertiesDialog = this.openPropertiesDialog.bind(this);
		this.closePropertiesDialog = this.closePropertiesDialog.bind(this);
		this.editName = this.editName.bind(this);
	}

	render() {
		// const component = this.props.component;
		let { opParams } = this.props.item;
		console.log(this.props.item);
		console.log(opParams);

		return (
			<div>
				<ContextMenu identifier={ItemTypes.OPERATION}>
					<MenuItem data={{test: 'test'}} onClick={this.deleteOperation}>
						Delete
					</MenuItem>
					<MenuItem onClick={this.openPropertiesDialog}>
						Properties
					</MenuItem>
		        </ContextMenu>
		        <Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closePropertiesDialog}
					style={customStyles}
				>
					<Row>
						<Col sm={2}>
							Name
						</Col>
						<Col sm={10}>
							<input ref="nameInput" type="text" placeholder="Name" />
						</Col>
					</Row>
					<button onClick={ () => this.editName() }>OK</button>
					<button onClick={ this.closePropertiesDialog }>Cancel</button>
				</Modal>
	        </div>
        )
	}

	openPropertiesDialog(event, data) {
		console.log("properties");
		this.setState({modalIsOpen: true});
	}

	editName(component) {
		// component.editName(this.refs.nameInput.value);
		this.setState({modalIsOpen: false});
	}

	deleteOperation(event, data) {
		console.log("delete");
		console.log(data);
	}

	afterOpenModal() {
		console.log("success");
	}

	closePropertiesDialog() {
		console.log("close");
		this.setState({modalIsOpen: false});
	}
}


export default connect(OperationContextMenu);