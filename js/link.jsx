import React from 'react';
import { ConfigureConsts } from './constants';

const width = ConfigureConsts.WIDTH;
const height = ConfigureConsts.HEIGHT;

export default class Link extends React.Component {
    render() {
        let start = this.props.start;
        let end = this.props.end;
        if (end.x < start.x) {
            start =  this.props.end;
            end = this.props.start;
        }
        const len = Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2));
        const angle = Math.atan((end.y - start.y) / (end.x - start.x));

        const style = {
            position: 'absolute',
            transform: 'translate(' + (start.x - .5 * len * (1 - Math.cos(angle)) - window.innerWidth/6 + width/2) + 'px, ' + (height/2 + start.y + .5 * len * Math.sin(angle)) + 'px) rotate(' + angle + 'rad)',
            width: len + 'px',
            height: '0px',
            borderBottom: this.props.style || '5px solid #D32F2F',
            zIndex: -1
        };
        //'translate(' + (start.x - .5 * len * (1 - Math.cos(angle))) + 'px, ' + (start.y + .5 * len * Math.sin(angle)) + 'px) 

        return <div style={style}></div>;
    }
}

Link.propTypes = {
    start: React.PropTypes.shape({
        x: React.PropTypes.number.isRequired,
        y: React.PropTypes.number.isRequired
    }),
    end: React.PropTypes.shape({
        x: React.PropTypes.number.isRequired,
        y: React.PropTypes.number.isRequired
    }),
    style: React.PropTypes.string
};