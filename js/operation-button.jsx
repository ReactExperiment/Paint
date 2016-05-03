import React from 'react';
import { Button } from 'react-bootstrap';

export default class OperationButton extends React.Component {
	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	onClick(e) {

	}

	render() {
		return (
			<Button bsStyle="success" block>OpBtn</Button>
		);
	}
}