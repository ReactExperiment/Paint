import React from 'react';
import { Button } from 'react-bootstrap';
import { addOperation } from './dispatcher';

export default class OperationButton extends React.Component {
	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	onClick(e) {
		addOperation(this.props.opType, this.props.opColor);
		console.log("add op!");
	}

	render() {
		return (
			<Button style={{ backgroundColor: this.props.opColor, color: 'white' }} block onClick={this.onClick}>{this.props.opType}</Button>
		);
	}
}