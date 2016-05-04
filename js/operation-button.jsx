import React from 'react';
import { Button } from 'react-bootstrap';
import { addOperation } from './dispatcher';

export default class OperationButton extends React.Component {
	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	onClick(e) {
		addOperation();
		console.log("add op!");
	}

	render() {
		return (
			<Button bsStyle="success" block onClick={this.onClick}>OpBtn</Button>
		);
	}
}