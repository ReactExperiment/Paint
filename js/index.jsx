import React from 'react';
import ReactDOM from 'react-dom';

import { observe } from './dispatcher';
import MainContainer from './main-container';

observe(
    (operationList) => ReactDOM.render(
        <MainContainer operationList={operationList}></MainContainer>,
        document.getElementById('app')
    )
)