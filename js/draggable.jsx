import React from 'react';

export default class Draggable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pos: {x: 0, y: 0},
      dragging: false,
      rel: null // position relative to the cursor
    };

    // Bind callback methods to make `this` the correct context.
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }
  // we could get away with not having this (and just having the listeners on
  // our div), but then the experience would be possibly be janky. If there's
  // anything w/ a higher z-index that gets in the way, then you're toast,
  // etc.
  componentDidUpdate(props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    }
  }

  // calculate relative position to the mouse and set dragging=true
  onMouseDown(e) {
    // only left mouse button
    if (e.button !== 0) return;
    var pos = this.refs.draggable.getClientRects()[0];
    this.setState({	
      dragging: true,
      rel: {
        x: e.pageX - pos.left,
        y: e.pageY - pos.top
      }
    });
    e.stopPropagation();
    e.preventDefault();
  }

  onMouseUp(e) {
    this.setState({dragging: false});
    e.stopPropagation();
    e.preventDefault();
  }

  onMouseMove(e) {
    if (!this.state.dragging) return;
    this.setState({
      pos: {
        x: e.pageX - this.state.rel.x,
        y: e.pageY - this.state.rel.y
      }
    });
    e.stopPropagation();
    e.preventDefault();
  }

  render() {
    // transferPropsTo will merge style & other props passed into our
    // component to also be on the child DIV.
    return React.DOM.div({
      onMouseDown: this.onMouseDown,
      style: {
      	position: 'absolute',
      	border: 'solid 1px black',
        left: this.state.pos.x + 'px',
        top: this.state.pos.y + 'px'
      },
      ref: 'draggable'
    }, this.props.children, this.props.initialValue);

    let draggableStyle = {
      position: 'absolute',
      border: 'solid 1px black',
      left: this.state.pos.x + 'px',
      top: this.state.pos.y + 'px'
    };

    <div style={draggableStyle} >
      {this.props.initialValue}
    </div>
  }
}
