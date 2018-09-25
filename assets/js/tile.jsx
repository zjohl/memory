import React from 'react';

export class Tile extends React.PureComponent {
    render() {
        let stateClass = this.props.active ? "active" : "inactive";
        let visibleClass = this.props.visible ? "" : " hidden";
        let classes = "tile " + stateClass + visibleClass;
        return <div className={classes}><div className="tile-content">{this.props.value}</div></div>;
    }
}

