import React from 'react';
import axios from 'axios';
import GuestSettings from './guestSettings';
import GuestVictory from './guestVictory';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextJump: false,
      settings: false,
      board: [],
      black: 12,
      red: 12,
      selected: [],
      turn: 'black',
      autoJumpRed: false,
      autoJumpBlack: false,
      victory: '',
      victoryMessage: '',
      playerOne: 'Player One',
      playerTwo: 'Player Two',
    };
    this.makeBoard = this.makeBoard.bind(this);
    this.settings = this.settings.bind(this);
    this.exitGuest = this.exitGuest.bind(this);

  }

  componentDidMount() {
    this.makeBoard('000000000000000000000000');
  }

  makeBoard(id) {
    axios.get(`/api/boards/${id}`)
      .then((data) => {
        data = data.data;
        this.setState({
          board: data.board, black: data.black, red: data.red, turn: data.turn, autoJumpRed: data.autoJumpRed, autoJumpBlack: data.autoJumpBlack, playerOne: 'Player One', playerTwo: 'Player Two', victory: '' });
      });
  }

  exitGuest() {
    this.setState({ victory: '' });
    this.makeBoard('000000000000000000000000');
  }

  settings() {
    const { settings } = this.state;
    this.setState({ settings: !settings });
  }



  render() {
    const { board, turn, playerOne, playerTwo, victory, settings, nextJump, victoryMessage,
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
      if (square[0] === 'x') {
        return (
          <img name={`${index}${i}`} className="piece" alt="" src="images/redPiece.png" />
        );
      }
      if (square[0] === 'X') {
        return (
          <img name={`${index}${i}`} className="piece" alt="" src="images/kingRedPiece.png" />
        );
      }
      if (square[0] === 'O') {
        return (
          <img name={`${index}${i}`} className="piece" alt="" src="images/kingBlackPiece.png" />
        );
      }
      return (
        <img name={`${index}${i}`} className="piece" alt="" src="images/blackPiece.png" />
      );
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
                  onClick={square[2] === 'selectRed' ? this.selectRed : square[2] === 'selectBlack' ? this.selectBlack : square[2] === 'moveSelected' ? this.moveSelected : null}
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

        <GuestSettings
          exit={this.settings}
          settings={settings}
        />

        <GuestVictory
          victory={victory}
          message={victoryMessage}
          exit={this.exitGuest}
        />

        <Jump
          nextJump={nextJump}
          toggleJump={this.toggleJump}
          skipJump={this.skipJump}
        />

      </div>
    );
  }
}

export default App;
