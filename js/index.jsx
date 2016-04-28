import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from './draggable';

var initialPos = {x: 0, y: 0};
var initialValue = 'test';

ReactDOM.render(
  <Draggable initialPos={initialPos} initialValue={initialValue}>
  </Draggable>,
  document.getElementById('test-a')
);
