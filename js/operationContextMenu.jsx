import React from "react";
import ReactDOM from "react-dom";
import { ContextMenu, MenuItem } from "react-contextmenu";
import { ItemTypes } from "./constants"

import Modal from "react-modal";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default class OperationContextMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {modalIsOpen: false};

		this.openPropertiesDialog = this.openPropertiesDialog.bind(this);
		this.closePropertiesDialog = this.closePropertiesDialog.bind(this);
	}

	render() {
		return (
			<div>
				<ContextMenu identifier={ItemTypes.OPERATION}>
					<MenuItem onClick={this.deleteOperation}>
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
					<h2>Test</h2>
					<button onClick={this.closePropertiesDialog}>Close</button>
				</Modal>
	        </div>
        )
	}

	openPropertiesDialog(event, data) {
		console.log("properties");
		this.setState({modalIsOpen: true});
	}

	deleteOperation(event, data) {
		console.log("delete");
	}

	afterOpenModal() {
		console.log("success");
	}

	closePropertiesDialog() {
		console.log("close");
		this.setState({modalIsOpen: false});
	}
}
