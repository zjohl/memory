import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';


export default function game_init(root) {
    ReactDOM.render(<Memory />, root);
}

class Memory extends React.Component {
    constructor(props) {
        super(props);
        let tileStates = this.generateTiles();

        this.state = {
            tiles: tileStates,
            revealedTileIdx: -1,
            numClicks: 0,
        };
    }

    generateTiles() {
        let possibleValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        let shuffledValues = _.shuffle(possibleValues);

        return _.map(shuffledValues, (val, index) => {
            return { value: val, active: true, visible: false, index: index };
        });
    }

    changeTile(tile, props) {
        let tileStates = this.state.tiles;
        let updatedTiles = _.map(tileStates, (t) => { return tile.index === t.index ? _.merge(t, props) : t});

        this.setState({tiles: updatedTiles});
    }

    revealTile(tile) {
        this.changeTile(tile, {visible: true});
    }

    hideTile(tile) {
        this.changeTile(tile, {visible: false});
    }

    deactivateTile(tile) {
        this.changeTile(tile, {active: false});
    }

    onTileClick(tile) {
        if (tile.active && !tile.visible) {
            this.setState({numClicks: this.state.numClicks + 1});
            this.revealTile(tile);

            if (this.state.revealedTileIdx !== -1) {
                let revealedTile = _.nth(this.state.tiles, this.state.revealedTileIdx);

                if (revealedTile.value === tile.value) {
                    this.deactivateTile(tile);
                    this.deactivateTile(revealedTile);
                } else {
                    this.hideTile(tile);
                    this.hideTile(revealedTile);
                }
                this.setState({revealedTileIdx: -1});
            } else {
                this.setState({revealedTileIdx: tile.index});
            }
        }
    }

    restart() {
        this.setState({
            tiles: this.generateTiles(),
            revealedTileIdx: -1,
            numClicks: 0,
        });
    }

    renderTiles() {
        return _.map(this.state.tiles, tile => {
            let stateClass = tile.active ? "active" : "inactive";
            let visibleClass = tile.visible ? "" : " hidden";
            let classes = "tile " + stateClass + visibleClass;
            return <div key={tile.index} className={classes} onClick={() => this.onTileClick(tile)}><div className="tile-content">{tile.value}</div></div>;
        });
    }

    render() {
        return<div className="game">
            <div className="tiles">
                {this.renderTiles()}
            </div>
            <button className="restart-button" onClick={this.restart.bind(this)}>Restart</button>
        </div>;
    }
}

