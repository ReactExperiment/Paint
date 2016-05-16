import React from "react";
import ReactDOM from "react-dom";
import { ContextMenu, MenuItem } from "react-contextmenu";
import { ItemTypes } from "./constants"

export default class OperationContextMenu extends React.Component {
	render() {
		return (
			<ContextMenu identifier={ItemTypes.OPERATION}>
				<MenuItem onClick={this.handleClick}>
					Delete
				</MenuItem>
				<MenuItem onClick={this.handleClick}>
					Properties
				</MenuItem>
	        </ContextMenu>
        )
	}

	handleClick(e, data) {
		console.log("click");
	}
}

MenuItem.propTypes = {

};