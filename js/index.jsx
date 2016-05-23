import React from 'react';
import ReactDOM from 'react-dom';

import { observe } from './dispatcher';
import MainContainer from './main-container';

observe(
    (operationList, linkList) => ReactDOM.render(
        <MainContainer operationList={operationList} linkList={linkList}></MainContainer>,
        document.getElementById('app')
    )
)