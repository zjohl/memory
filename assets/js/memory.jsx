import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { Tile } from "./tile";


export default function game_init(root) {
    ReactDOM.render(<Memory />, root);
}

class Memory extends React.Component {
    constructor(props) {
        super(props);
        let tileStates = this.generateTiles();

        this.state = { tiles: tileStates };
    }

    generateTiles() {
        let possibleValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        let shuffledValues = _.shuffle(possibleValues);

        return _.map(shuffledValues, (val, index) => {
            return { value: val, active: true, visible: false, index: index };
        });
    }

    onTileClick(tile) {
        return tile => {
            if (tile.active && !tile.visible) {
                let tileStates = this.state.tiles;
                let updatedTiles =
                this.setState({tiles: updatedTiles})
            }
        }
    }

    renderTiles() {
        return _.map(this.state.tiles, tile => {
            return <Tile value={tile.value} active={tile.active} visible={tile.visible} onClick={() => this.onTileClick(tile)}/>;
        });
    }

    render() {
        return<div className="game">
            <div className="tiles">
                {this.renderTiles()}
            </div>
            <button className="restart-button">Restart</button>
        </div>;
    }
}

