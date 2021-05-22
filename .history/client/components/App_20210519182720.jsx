import React from 'react';
import axios from 'axios';
import Welcome from './welcome';
import Settings from './settings';
import Save from './save';
import Jump from './jump';
import { King, Queen, Bishop, Knight, Rook, Pawn } from './Pieces.js';
import Game from './Game.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      nextJump: false,
      settings: false,
      saveView: false,
      savedView: false,
      board: [],
      black: 12,
      red: 12,
      selected: [],
      turn: 'black',
      autoJumpRed: false,
      autoJumpBlack: false,
      modal: true,
      victory: '',
      victoryMessage: '',
      gameList: [],
      playerOne: 'Player One',
      playerTwo: 'Player Two',
    };


  render() {
    const { board, turn, modal, gameList, playerOne, playerTwo, victory, settings,
      savedView, saveView, nextJump, victoryMessage,
    } = this.state;
    const playersTurn = () => {
      if (turn === 'black') {
        return playerOne;
      }
      return playerTwo;
    };
    const whichPiece = (square, index, i) => {
      if (square[0] === null) {
        return null;
      }
      if (square[0] === 'br1') {
        return new Rook(2);
        // <img name={`${index}${i}`} className="blackpiece" alt="" src="images/blackrook.png" />
      }
      if (square[0] === 'bkn1' || square[0] === 'bkn2') {
        return (
          <img name={`${index}${i}`} className="blackpiece" alt="" src="images/blackknight.png" />
        );
      }
      if (square[0] === 'bb1' || square[0] === 'bb2') {
        return (
          <img name={`${index}${i}`} className="blackpiece" alt="" src="images/blackbishop.png" />
        );
      }
      if (square[0] === 'bk') {
        return (
          <img name={`${index}${i}`} className="blackpiece" alt="" src="images/blackking.png" />
        );
      }
      if (square[0] === 'bq') {
        return (
          <img name={`${index}${i}`} className="blackpiece" alt="" src="images/blackqueen.png" />
        );
      }
      if (square[0] === 'bp') {
        return (
          <img name={`${index}${i}`} className="blackpiece" alt="" src="images/blackpawn.png" />
        );
      }
      if (square[0] === 'wr1' || square[0] === 'wr2') {
        return (
          <img name={`${index}${i}`} className="whitepiece" alt="" src="images/whiterook.png" />
        );
      }
      if (square[0] === 'wkn1' || square[0] === 'wkn2') {
        return (
          <img name={`${index}${i}`} className="whitepiece" alt="" src="images/whiteknight.png" />
        );
      }
      if (square[0] === 'wb1' || square[0] === 'wb2') {
        return (
          <img name={`${index}${i}`} className="whitepiece" alt="" src="images/whitebishop.png" />
        );
      }
      if (square[0] === 'wk') {
        return (
          <img name={`${index}${i}`} className="whitepiece" alt="" src="images/whiteking.png" />
        );
      }
      if (square[0] === 'wq') {
        return (
          <img name={`${index}${i}`} className="whitepiece" alt="" src="images/whitequeen.png" />
        );
      }
      if (square[0] === 'wp') {
        return (
          <img name={`${index}${i}`} className="whitepiece" alt="" src="images/whitepawn.png" />
        );
      }
    };

    return (
      <div>
        <img onClick={this.settings} className="settings" src="images/settings.png"/>
        <div className="head">
          <h5>{`Your turn ${playersTurn()}!`}</h5>
        </div>
        <div>
          {board.map((row, index) => (
            <div className="grid" key={`row ${Math.random() * 1000}`}>
              {row.map((square, i) => (
                <div
                  onClick={square[2] === 'selectRed'
                    ? this.selectRed
                    : square[2] === 'selectBlack'
                      ? this.selectBlack
                      : square[2] === 'moveSelected'
                        ? this.moveSelected
                        : null}
                  onKeyPress={square[2] === 'selectRed' ? this.selectRed : square[2] === 'selectBlack' ? this.selectBlack : square[2] === 'moveSelected' ? this.moveSelected : null}
                  name={`${index}${i}`}
                  className={square[1]}
                  key={`square ${Math.random() * 1000}`}
                >
                  {whichPiece(square, index, i)}
                </div>
              ))}
            </div>
          ))}
        </div>

        <Settings
          saveGame={this.saveGame}
          changeGame={this.changeGame}
          exit={this.settings}
          modal={modal}
          settings={settings}
        />

        <Save
          save={this.save}
          exit={this.saveGame}
          saveView={saveView}
        />

        <Jump
          nextJump={nextJump}
          toggleJump={this.toggleJump}
          skipJump={this.skipJump}
        />

        <Welcome
          username={playerOne}
          makeBoard={this.makeBoard}
          modal={modal}
          victory={victory}
          message={victoryMessage}
          savedView={savedView}
          changeView={this.changeWelcomeView}
          changeVictory={this.changeVictory}
          onClose={this.toggleModal}
          players={this.players}
          gameList={gameList}
        />

        <Game />
      </div>
    );
  }
}

export default App;
