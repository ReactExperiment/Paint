// import React from 'react';
// import Line from 'react-shapes';

// export default class Link extends React.Component {
//     render() {
//         return (
//             <Line x1={25} x2={350} y1={25} y2={350}  stroke={{color:'#E65243'}} strokeWidth={3} />
//         );
//     }
// }

import React from 'react';

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
            position: 'fixed',
            transform: 'translate(' + (-210 + 30 + start.x - .5 * len * (1 - Math.cos(angle))) + 'px, ' + (-10 + 18 + start.y + .5 * len * Math.sin(angle)) + 'px) rotate(' + angle + 'rad)',
            width: len + 'px',
            height: '0px',
            borderBottom: this.props.style || '1px solid black',
            zIndex: 0
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