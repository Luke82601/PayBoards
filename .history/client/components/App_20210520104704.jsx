import React from 'react';
import axios from 'axios';
import Welcome from './welcome';
import Settings from './settings';
import Save from './save';
import King from '../pieces/King.js';
import Queen from '../pieces/Queen.js';
import Rook from '../pieces/Rook.js';
import Knight from '../pieces/Knight.js';
import Bishop from '../pieces/Bishop.js';
import Pawn from '../pieces/Pawn.js';
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
      white: 12,
      selected: [],
      // turn: 'black',
      autoJumpRed: false,
      autoJumpBlack: false,
      modal: true,
      victory: '',
      victoryMessage: '',
      gameList: [],
      // playerOne: 'Player One',
      // playerTwo: 'Player Two',

      whiteFallenSoldiers: [],
      blackFallenSoldiers: [],
      player: 1,
      sourceSelection: -1,
      status: '',
      turn: 'white'
    };
    this.makeBoard = this.makeBoard.bind(this);
    this.settings = this.settings.bind(this);
    this.saveGame = this.saveGame.bind(this);
    this.save = this.save.bind(this);
    this.changeGame = this.changeGame.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.changeWelcomeView = this.changeWelcomeView.bind(this);
    this.changeVictory = this.changeVictory.bind(this);
  }

  componentDidMount() {
    this.makeBoard('000000000000000000000000');
  }

  makeBoard(id, playerTwo) {
    axios.get(`/api/boards/${id}`)
      .then((data) => {
        return data.data;
      })
      .then((data) => {
        axios.get('/user')
          .then((user) => {
            if (data.playerTwo === '') {
              data.playerTwo = playerTwo ? playerTwo : '';
            }
            data.username = user.data.username;
            data.id = user.data.id;
            return data;
          })
          .then((data) => {
            axios.get(`/api/games/${data.id}`)
              .then((games) => {
                if (data.playerTwo === '') {
                  data.playerTwo = 'Player Two';
                }
                this.setState({
                  board: data.board, black: data.black, red: data.red, turn: data.turn, autoJumpRed: data.autoJumpRed, autoJumpBlack: data.autoJumpBlack, playerOne: data.playerOne, playerTwo: data.playerTwo, victory: '', playerOne: data.username, id: data.id, gameList: games.data.games });
              });
          });
      });
  }

  changeWelcomeView() {
    const { savedView } = this.state;
    this.setState({ savedView: !savedView });
  }

  settings() {
    const { settings } = this.state;
    this.setState({ settings: !settings });
  }

  saveGame() {
    const { saveView } = this.state;
    this.setState({ saveView: !saveView });
  }

  toggleJump() {
    const { nextJump } = this.state;
    this.setState({ nextJump: !nextJump });
  }


  save(name) {
    const {
      playerOne, playerTwo, board, black, red,
      turn, autoJumpRed, autoJumpBlack, gameList, id,
    } = this.state;
    axios.post(`/api/games/${id}`, {
      board: {
        name: name === '' ? `${playerOne} v ${playerTwo}` : name,
        board,
        black,
        red,
        turn,
        autoJumpRed,
        autoJumpBlack,
        playerOne,
        playerTwo,
      },
      games: gameList,
    });
  }

  changeGame() {
    this.toggleModal();
    this.makeBoard('000000000000000000000000');
  }

  toggleModal() {
    const { modal } = this.state;
    this.setState({ modal: !modal });
  }

  changeVictory() {
    this.setState({ victory: '', victoryMessage: '' });
  }

  handleClick(i) {
    const squares = this.state.squares.slice();

    if (this.state.sourceSelection === -1) {
      if (!squares[i] || squares[i].player !== this.state.player) {
        this.setState({status: 'Wrong selection. Choose player ' + this.state.player + ' pieces.'});
        squares[i] ? delete squares[i].style.backgroundColor : null;
      } else {
        squares[i].style = [...squares[i].style], {backgroundColor: 'RGB(111,143,114)'}; // Emerald from http://omgchess.blogspot.com/2015/09/chess-board-color-schemes.html
        this.setState({
          status: 'Choose destination for the selected piece',
          sourceSelection: i
        });
      }
    } else if (this.state.sourceSelection > -1) {
      delete squares[this.state.sourceSelection].style.backgroundColor;
      if (squares[i] && squares[i].player === this.state.player) {
        this.setState({
          status: 'Wrong selection. Choose valid source and destination again.',
          sourceSelection: -1,
        });
      } else {

        const squares = this.state.squares.slice();
        const whiteFallenSoldiers = this.state.whiteFallenSoldiers.slice();
        const blackFallenSoldiers = this.state.blackFallenSoldiers.slice();
        const isDestEnemyOccupied = squares[i] ? true : false;
        const isMovePossible = squares[this.state.sourceSelection].isMovePossible(this.state.sourceSelection, i, isDestEnemyOccupied);
        const srcToDestPath = squares[this.state.sourceSelection].getSrcToDestPath(this.state.sourceSelection, i);
        const isMoveLegal = this.isMoveLegal(srcToDestPath);

        if (isMovePossible && isMoveLegal) {
          if (squares[i] !== null) {
            if (squares[i].player === 1) {
              whiteFallenSoldiers.push(squares[i]);
            } else {
              blackFallenSoldiers.push(squares[i]);
            }
          }
          console.log('whiteFallenSoldiers', whiteFallenSoldiers);
          console.log('blackFallenSoldiers', blackFallenSoldiers);
          squares[i] = squares[this.state.sourceSelection];
          squares[this.state.sourceSelection] = null;
          let player = this.state.player === 1 ? 2 : 1;
          let turn = this.state.turn === 'white' ? 'black' : 'white';
          this.setState({
            sourceSelection: -1,
            squares: squares,
            whiteFallenSoldiers: whiteFallenSoldiers,
            blackFallenSoldiers: blackFallenSoldiers,
            player: player,
            status: '',
            turn: turn
          });
        } else {
          this.setState({
            status: 'Wrong selection. Choose valid source and destination again.',
            sourceSelection: -1,
          });
        }
      }
    }

  }

  /**
   * Check all path indices are null. For one steps move of pawn/others or jumping moves of knight array is empty, so  move is legal.
   * @param  {[type]}  srcToDestPath [array of board indices comprising path between src and dest ]
   * @return {Boolean}
   */
  isMoveLegal(srcToDestPath) {
    let isLegal = true;
    for (let i = 0; i < srcToDestPath.length; i++) {
      if (this.state.squares[srcToDestPath[i]] !== null) {
        isLegal = false;
      }
    }
    return isLegal;
  }















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
      if (square[0] === 'br1' || square[0] === 'br2') {
        return (
          <img name={`${index}${i}`} className="blackpiece" alt="" src="images/blackrook.png" />
        );
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
      </div>
    );
  }
}

export default App;
