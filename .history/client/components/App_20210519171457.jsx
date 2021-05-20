import React from 'react';
import axios from 'axios';
import Welcome from './welcome';
import Settings from './settings';
import Save from './save';
import Jump from './jump';
import { King, Queen, Bishop, Knight, Rook, Pawn } from './Pieces.jsx';

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
    this.makeBoard = this.makeBoard.bind(this);
    this.settings = this.settings.bind(this);
    this.saveGame = this.saveGame.bind(this);
    this.save = this.save.bind(this);
    this.toggleJump = this.toggleJump.bind(this);
    this.skipJump = this.skipJump.bind(this);
    this.checkTurnRed = this.checkTurnRed.bind(this);
    this.checkTurnBlack = this.checkTurnBlack.bind(this);
    this.jumpCheckRed = this.jumpCheckRed.bind(this);
    this.jumpCheckBlack = this.jumpCheckBlack.bind(this);
    this.checkAutoJumpRed = this.checkAutoJumpRed.bind(this);
    this.checkAutoJumpBlack = this.checkAutoJumpBlack.bind(this);
    this.checkNextJumpBlack = this.checkNextJumpBlack.bind(this);
    this.changeGame = this.changeGame.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.changeWelcomeView = this.changeWelcomeView.bind(this);
    this.changeVictory = this.changeVictory.bind(this);
    this.players = this.players.bind(this);
    this.moveSelected = this.moveSelected.bind(this);
    this.resetRed = this.resetRed.bind(this);
    this.resetRedJump = this.resetRedJump.bind(this);
    this.selectRed = this.selectRed.bind(this);
    this.resetBlack = this.resetBlack.bind(this);
    this.resetBlackJump = this.resetBlackJump.bind(this);
    this.selectBlack = this.selectBlack.bind(this);
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

  skipJump() {
    const { turn } = this.state;
    if (turn === 'red') {
      this.resetRedJump();
      this.checkAutoJumpBlack();
    } else {
      this.resetBlackJump();
      this.checkAutoJumpRed();
    }
    this.setState({ turn: turn === 'red' ? 'black' : 'red' });
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

  players(two) {
    this.setState({ playerTwo: two });
  }

  checkNextJumpRed(rows, columns) {
    const { board } = this.state;
    board[rows][columns][1] = 'selectedPiece';
    if (rows > 1 && columns > 1 && board[rows - 2][columns - 2] !== undefined && board[rows - 2][columns - 2][0] === null && board[rows][columns][0] === 'X' && (board[rows - 1][columns - 1][0] === 'o' || board[rows - 1][columns - 1][0] === 'O')) {
      board[rows - 2][columns - 2][1] = 'selectedSquare';
      board[rows - 2][columns - 2][2] = 'moveSelected';
    }
    if (rows > 1 && columns < 6 && board[rows - 2][columns + 2] !== undefined && board[rows - 2][columns + 2][0] === null && board[rows][columns][0] === 'X' && (board[rows - 1][columns + 1][0] === 'o' || board[rows - 1][columns + 1][0] === 'O')) {
      board[rows - 2][columns + 2][1] = 'selectedSquare';
      board[rows - 2][columns + 2][2] = 'moveSelected';
    }
    if (rows < 6 && columns > 1 && board[rows + 2][columns - 2] !== undefined && board[rows + 2][columns - 2][0] === null && (board[rows + 1][columns - 1][0] === 'o' || board[rows + 1][columns - 1][0] === 'O')) {
      board[rows + 2][columns - 2][1] = 'selectedSquare';
      board[rows + 2][columns - 2][2] = 'moveSelected';
    }
    if (rows < 6 && columns < 6 && board[rows + 2][columns + 2] !== undefined && board[rows + 2][columns + 2][0] === null && (board[rows + 1][columns + 1][0] === 'o' || board[rows + 1][columns + 1][0] === 'O')) {
      board[rows + 2][columns + 2][1] = 'selectedSquare';
      board[rows + 2][columns + 2][2] = 'moveSelected';
    }
    this.setState({ selected: [rows, columns] });
    this.setState({ nextJump: true });
  }

  checkNextJumpBlack(rows, columns) {
    const { board } = this.state;
    board[rows][columns][1] = 'selectedPiece';
    if (rows > 1 && columns > 1 && board[rows - 2][columns - 2] !== undefined && board[rows - 2][columns - 2][0] === null && (board[rows - 1][columns - 1][0] === 'x' || board[rows - 1][columns - 1][0] === 'X')) {
      board[rows - 2][columns - 2][1] = 'selectedSquare';
      board[rows - 2][columns - 2][2] = 'moveSelected';
    }
    if (rows > 1 && columns < 6 && board[rows - 2][columns + 2] !== undefined && board[rows - 2][columns + 2][0] === null && (board[rows - 1][columns + 1][0] === 'x' || board[rows - 1][columns + 1][0] === 'X')) {
      board[rows - 2][columns + 2][1] = 'selectedSquare';
      board[rows - 2][columns + 2][2] = 'moveSelected';
    }
    if (rows < 6 && columns > 1 && board[rows + 2][columns - 2] !== undefined && board[rows + 2][columns - 2][0] === null && board[rows][columns][0] === 'O' && (board[rows + 1][columns - 1][0] === 'x' || board[rows + 1][columns - 1][0] === 'X')) {
      board[rows + 2][columns - 2][1] = 'selectedSquare';
      board[rows + 2][columns - 2][2] = 'moveSelected';
    }
    if (rows < 6 && columns < 6 && board[rows + 2][columns + 2] !== undefined && board[rows + 2][columns + 2][0] === null && board[rows][columns][0] === 'O' && (board[rows + 1][columns + 1][0] === 'x' || board[rows + 1][columns + 1][0] === 'X')) {
      board[rows + 2][columns + 2][1] = 'selectedSquare';
      board[rows + 2][columns + 2][2] = 'moveSelected';
    }
    this.setState({ selected: [rows, columns] });
    this.setState({ nextJump: true });
  }

  checkTurnRed() {
    const { board } = this.state;
    for (let row = 0; row < board.length; row += 1) {
      for (let column = 0; column < board[row].length; column += 1) {
        if (board[row][column][0] === 'x' || board[row][column][0] === 'X') {
          if (board[row][column][0] === 'X') {
            if ((board[row - 2] && board[row - 2][column - 2] && row > 0 && column > 0 && board[row - 1][column - 1][0] === 'o' && board[row - 2][column - 2][0] === null)
              || (board[row - 2] && board[row - 2][column - 2] && row > 0 && column > 0 && board[row - 1][column - 1][0] === 'O' && board[row - 2][column - 2][0] === null)
              || (board[row - 2] && board[row - 2][column + 2] && row > 0 && column < 7 && board[row - 1][column + 1][0] === 'o' && board[row - 2][column + 2][0] === null)
              || (board[row - 2] && board[row - 2][column + 2] && row > 0 && column < 7 && board[row - 1][column + 1][0] === 'O' && board[row - 2][column + 2][0] === null)
              || (board[row - 1] && board[row - 1][column - 1] && board[row - 1][column - 1][0] === null)
              || (board[row - 1] && board[row - 1][column + 1] && board[row - 1][column + 1][0] === null)) {
              return true;
            }
          }
          if ((board[row + 2] && board[row + 2][column - 2] && row < 7 && column > 0 && board[row + 1][column - 1][0] === 'o' && board[row + 2][column - 2][0] === null)
            || (board[row + 2] && board[row + 2][column - 2] && row < 7 && column > 0 && board[row + 1][column - 1][0] === 'O' && board[row + 2][column - 2][0] === null)
            || (board[row + 2] && board[row + 2][column + 2] && row < 7 && column < 7 && board[row + 1][column + 1][0] === 'o' && board[row + 2][column + 2][0] === null)
            || (board[row + 2] && board[row + 2][column + 2] && row < 7 && column < 7 && board[row + 1][column + 1][0] === 'O' && board[row + 2][column + 2][0] === null)
            || (board[row + 1] && board[row + 1][column - 1] && board[row + 1][column - 1][0] === null)
            || (board[row + 1] && board[row + 1][column + 1] && board[row + 1][column + 1][0] === null)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  checkTurnBlack() {
    const { board } = this.state;
    for (let row = 0; row < board.length; row += 1) {
      for (let column = 0; column < board[row].length; column += 1) {
        if (board[row][column][0] === 'o' || board[row][column][0] === 'O') {
          if (board[row][column][0] === 'O') {
            if ((board[row + 2] && board[row + 2][column - 2] && row < 7 && column > 0 && board[row + 1][column - 1][0] === 'X' && board[row + 2][column - 2][0] === null)
            || (board[row + 2] && board[row + 2][column + 2] && row < 7 && column < 7 && board[row + 1][column + 1][0] === 'X' && board[row + 2][column + 2][0] === null)
            || (board[row + 2] && board[row + 2][column - 2] && row < 7 && column > 0 && board[row + 1][column - 1][0] === 'x' && board[row + 2][column - 2][0] === null)
            || (board[row + 2] && board[row + 2][column + 2] && row < 7 && column < 7 && board[row + 1][column + 1][0] === 'x' && board[row + 2][column + 2][0] === null)
            || (board[row + 1] && board[row + 1][column - 1] && board[row + 1][column - 1][0] === null)
            || (board[row + 1] && board[row + 1][column + 1] && board[row + 1][column + 1][0] === null)) {
              return true;
            }
          }
          if ((board[row - 2] && board[row - 2][column - 2] && row > 0 && column > 0 && board[row - 1][column - 1][0] === 'X' && board[row - 2][column - 2][0] === null)
            || (board[row - 2] && board[row - 2][column + 2] && row > 0 && column < 7 && board[row - 1][column + 1][0] === 'X' && board[row - 2][column + 2][0] === null)
            || (board[row - 2] && board[row - 2][column - 2] && row > 0 && column > 0 && board[row - 1][column - 1][0] === 'x' && board[row - 2][column - 2][0] === null)
            || (board[row - 2] && board[row - 2][column + 2] && row > 0 && column < 7 && board[row - 1][column + 1][0] === 'x' && board[row - 2][column + 2][0] === null)
            || (board[row - 1] && board[row - 1][column - 1] && board[row - 1][column - 1][0] === null)
            || (board[row - 1] && board[row - 1][column + 1] && board[row - 1][column + 1][0] === null)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  checkAutoJumpRed() {
    const { board } = this.state;
    for (let row = 0; row < board.length; row += 1) {
      for (let column = 0; column < board[row].length; column += 1) {
        if (board[row][column][0] === 'x' || board[row][column][0] === 'X') {
          if (board[row][column][0] === 'X') {
            if ((board[row - 2] && board[row - 2][column - 2] && row > 0 && column > 0 && board[row - 1][column - 1][0] === 'o' && board[row - 2][column - 2][0] === null)
              || (board[row - 2] && board[row - 2][column - 2] && row > 0 && column > 0 && board[row - 1][column - 1][0] === 'O' && board[row - 2][column - 2][0] === null)
              || (board[row - 2] && board[row - 2][column + 2] && row > 0 && column < 7 && board[row - 1][column + 1][0] === 'o' && board[row - 2][column + 2][0] === null)
              || (board[row - 2] && board[row - 2][column + 2] && row > 0 && column < 7 && board[row - 1][column + 1][0] === 'O' && board[row - 2][column + 2][0] === null)) {
              this.setState({ autoJumpRed: true });
              break;
            }
          }
          if ((board[row + 2] && board[row + 2][column - 2] && row < 7 && column > 0 && board[row + 1][column - 1][0] === 'o' && board[row + 2][column - 2][0] === null)
            || (board[row + 2] && board[row + 2][column - 2] && row < 7 && column > 0 && board[row + 1][column - 1][0] === 'O' && board[row + 2][column - 2][0] === null)
            || (board[row + 2] && board[row + 2][column + 2] && row < 7 && column < 7 && board[row + 1][column + 1][0] === 'o' && board[row + 2][column + 2][0] === null)
            || (board[row + 2] && board[row + 2][column + 2] && row < 7 && column < 7 && board[row + 1][column + 1][0] === 'O' && board[row + 2][column + 2][0] === null)) {
            this.setState({ autoJumpRed: true });
            break;
          }
        }
      }
    }
  }

  checkAutoJumpBlack() {
    const { board } = this.state;
    for (let row = 0; row < board.length; row += 1) {
      for (let column = 0; column < board[row].length; column += 1) {
        if (board[row][column][0] === 'o' || board[row][column][0] === 'O') {
          if (board[row][column][0] === 'O') {
            if ((board[row + 2] && board[row + 2][column - 2] && row < 7 && column > 0 && board[row + 1][column - 1][0] === 'X' && board[row + 2][column - 2][0] === null)
            || (board[row + 2] && board[row + 2][column + 2] && row < 7 && column < 7 && board[row + 1][column + 1][0] === 'X' && board[row + 2][column + 2][0] === null)
            || (board[row + 2] && board[row + 2][column - 2] && row < 7 && column > 0 && board[row + 1][column - 1][0] === 'x' && board[row + 2][column - 2][0] === null)
            || (board[row + 2] && board[row + 2][column + 2] && row < 7 && column < 7 && board[row + 1][column + 1][0] === 'x' && board[row + 2][column + 2][0] === null)) {
              this.setState({ autoJumpBlack: true });
              break;
            }
          }
          if ((board[row - 2] && board[row - 2][column - 2] && row > 0 && column > 0 && board[row - 1][column - 1][0] === 'X' && board[row - 2][column - 2][0] === null)
            || (board[row - 2] && board[row - 2][column + 2] && row > 0 && column < 7 && board[row - 1][column + 1][0] === 'X' && board[row - 2][column + 2][0] === null)
            || (board[row - 2] && board[row - 2][column - 2] && row > 0 && column > 0 && board[row - 1][column - 1][0] === 'x' && board[row - 2][column - 2][0] === null)
            || (board[row - 2] && board[row - 2][column + 2] && row > 0 && column < 7 && board[row - 1][column + 1][0] === 'x' && board[row - 2][column + 2][0] === null)) {
            this.setState({ autoJumpBlack: true });
            break;
          }
        }
      }
    }
  }

  jumpCheckRed(rows, columns) {
    const { board } = this.state;
    let isDouble = false;
    if (board[rows][columns][0] === 'X') {
      if ((board[rows - 2] && board[rows - 2][columns - 2] && rows > 0 && columns > 0 && board[rows - 1][columns - 1][0] === 'o' && board[rows - 2][columns - 2][0] === null)
        || (board[rows - 2] && board[rows - 2][columns - 2] && rows > 0 && columns > 0 && board[rows - 1][columns - 1][0] === 'O' && board[rows - 2][columns - 2][0] === null)
        || (board[rows - 2] && board[rows - 2][columns + 2] && rows > 0 && columns < 7 && board[rows - 1][columns + 1][0] === 'o' && board[rows - 2][columns + 2][0] === null)
        || (board[rows - 2] && board[rows - 2][columns + 2] && rows > 0 && columns < 7 && board[rows - 1][columns + 1][0] === 'O' && board[rows - 2][columns + 2][0] === null)) {
        this.checkNextJumpRed(rows, columns);
        isDouble = true;
      }
    }
    if ((board[rows + 2] && board[rows + 2][columns - 2] && rows < 7 && columns > 0 && board[rows + 1][columns - 1][0] === 'o' && board[rows + 2][columns - 2][0] === null)
      || (board[rows + 2] && board[rows + 2][columns - 2] && rows < 7 && columns > 0 && board[rows + 1][columns - 1][0] === 'O' && board[rows + 2][columns - 2][0] === null)
      || (board[rows + 2] && board[rows + 2][columns + 2] && rows < 7 && columns < 7 && board[rows + 1][columns + 1][0] === 'o' && board[rows + 2][columns + 2][0] === null)
      || (board[rows + 2] && board[rows + 2][columns + 2] && rows < 7 && columns < 7 && board[rows + 1][columns + 1][0] === 'O' && board[rows + 2][columns + 2][0] === null)) {
      this.checkNextJumpRed(rows, columns);
      isDouble = true;
    }
    return isDouble;
  }

  jumpCheckBlack(rows, columns) {
    const { board } = this.state;
    let isDouble = false;
    if (board[rows][columns][0] === 'O') {
      if ((board[rows + 2] && board[rows + 2][columns - 2] && rows < 7 && columns > 0 && board[rows + 1][columns - 1][0] === 'x' && board[rows + 2][columns - 2][0] === null)
        || (board[rows + 2] && board[rows + 2][columns - 2] && rows < 7 && columns > 0 && board[rows + 1][columns - 1][0] === 'X' && board[rows + 2][columns - 2][0] === null)
        || (board[rows + 2] && board[rows + 2][columns + 2] && rows < 7 && columns < 7 && board[rows + 1][columns + 1][0] === 'x' && board[rows + 2][columns + 2][0] === null)
        || (board[rows + 2] && board[rows + 2][columns + 2] && rows < 7 && columns < 7 && board[rows + 1][columns + 1][0] === 'X' && board[rows + 2][columns + 2][0] === null)) {
        this.checkNextJumpBlack(rows, columns);
        isDouble = true;
      }
    }
    if ((board[rows - 2] && board[rows - 2][columns - 2] && rows > 0 && columns > 0 && board[rows - 1][columns - 1][0] === 'x' && board[rows - 2][columns - 2][0] === null)
      || (board[rows - 2] && board[rows - 2][columns - 2] && rows > 0 && columns > 0 && board[rows - 1][columns - 1][0] === 'X' && board[rows - 2][columns - 2][0] === null)
      || (board[rows - 2] && board[rows - 2][columns + 2] && rows > 0 && columns < 7 && board[rows - 1][columns + 1][0] === 'x' && board[rows - 2][columns + 2][0] === null)
      || (board[rows - 2] && board[rows - 2][columns + 2] && rows > 0 && columns < 7 && board[rows - 1][columns + 1][0] === 'X' && board[rows - 2][columns + 2][0] === null)) {
      this.checkNextJumpBlack(rows, columns);
      isDouble = true;
    }
    return isDouble;
  }

  moveSelected(event) {
    const target = event.target.getAttribute('name');
    const {
      board, selected, turn, autoJumpBlack, autoJumpRed,
      black, red, playerOne, playerTwo,
    } = this.state;
    const rows = Number(target.charAt(0));
    const columns = Number(target.charAt());
    const to = board[rows][columns];
    const from = board[selected[0]][selected[1]];
    let isDouble = false;
    board[rows][columns] = from;
    board[selected[0]][selected[1]] = to;
    board[rows][columns][1] = 'redSquare';
    board[selected[0]][selected[1]][2] = '';
    if (turn === 'black') {
      if (rows === 0) {
        board[rows][columns][0] = 'O';
      }
      if (autoJumpBlack) {
        const rowToDelete = (rows + selected[0]) / 2;
        const columnToDelete = (columns + selected[1]) / 2;
        board[rowToDelete][columnToDelete] = [null, 'redSquare', ''];
        this.setState((prevState) => ({ red: prevState.red - 1 }));
        this.resetBlackJump();
        isDouble = this.jumpCheckBlack(rows, columns);
      } else {
        this.resetBlack();
      }
      if (!isDouble) {
        this.setState({ turn: 'red', autoJumpBlack: false });
        if (this.checkTurnRed()) {
          this.checkAutoJumpRed();
        } else {
          const message = red === 1 ? '' : 'No more turns!';
          this.setState({ modal: true, savedView: false, victory: playerOne, victoryMessage: message });
        }
      }
    } else {
      if (rows === 7) {
        board[rows][columns][0] = 'X';
      }
      if (autoJumpRed) {
        const rowToDelete = (rows + selected[0]) / 2;
        const columnToDelete = (columns + selected[1]) / 2;
        board[rowToDelete][columnToDelete] = [null, 'redSquare', ''];
        this.setState((prevState) => ({ black: prevState.black - 1 }));
        this.resetRedJump();
        isDouble = this.jumpCheckRed(rows, columns);
      } else {
        this.resetRed();
      }
      if (!isDouble) {
        this.setState({ turn: 'black', autoJumpRed: false });
        if (this.checkTurnBlack()) {
          this.checkAutoJumpBlack();
        } else {
          const message = black === 1 ? '' : 'No more turns!';
          this.setState({ modal: true, savedView: false, victory: playerTwo, victoryMessage: message });
        }
      }
    }
  }

  resetRed() {
    const { board, selected } = this.state;
    board[selected[0]][selected[1]][1] = 'redSquare';
    if (selected[0] > 0 && selected[1] > 0 && board[selected[0] - 1][selected[1] - 1]
      !== undefined && board[selected[0] - 1][selected[1] - 1][0] === null) {
      board[selected[0] - 1][selected[1] - 1][1] = 'redSquare';
      board[selected[0] - 1][selected[1] - 1][2] = '';
    }
    if (selected[0] > 0 && selected[1] < 7 && board[selected[0] - 1][selected[1] + 1]
      !== undefined && board[selected[0] - 1][selected[1] + 1][0] === null) {
      board[selected[0] - 1][selected[1] + 1][1] = 'redSquare';
      board[selected[0] - 1][selected[1] + 1][2] = '';
    }
    if (selected[0] < 7 && selected[1] > 0 && board[selected[0] + 1][selected[1] - 1]
      !== undefined && board[selected[0] + 1][selected[1] - 1][0] === null) {
      board[selected[0] + 1][selected[1] - 1][1] = 'redSquare';
      board[selected[0] + 1][selected[1] - 1][2] = '';
    }
    if (selected[0] < 7 && selected[1] < 7 && board[selected[0] + 1][selected[1] + 1]
      !== undefined && board[selected[0] + 1][selected[1] + 1][0] === null) {
      board[selected[0] + 1][selected[1] + 1][1] = 'redSquare';
      board[selected[0] + 1][selected[1] + 1][2] = '';
    }
    this.setState({ selected: [] });
  }

  resetRedJump() {
    const { board, selected } = this.state;
    board[selected[0]][selected[1]][1] = 'redSquare';
    if (selected[0] > 1 && selected[1] > 1 && board[selected[0] - 2][selected[1] - 2]
      !== undefined && board[selected[0] - 2][selected[1] - 2][0] === null) {
      board[selected[0] - 2][selected[1] - 2][1] = 'redSquare';
      board[selected[0] - 2][selected[1] - 2][2] = '';
    }
    if (selected[0] > 1 && selected[1] < 6 && board[selected[0] - 2][selected[1] + 2]
      !== undefined && board[selected[0] - 2][selected[1] + 2][0] === null) {
      board[selected[0] - 2][selected[1] + 2][1] = 'redSquare';
      board[selected[0] - 2][selected[1] + 2][2] = '';
    }
    if (selected[0] < 6 && selected[1] > 1 && board[selected[0] + 2][selected[1] - 2]
      !== undefined && board[selected[0] + 2][selected[1] - 2][0] === null) {
      board[selected[0] + 2][selected[1] - 2][1] = 'redSquare';
      board[selected[0] + 2][selected[1] - 2][2] = '';
    }
    if (selected[0] < 6 && selected[1] < 6 && board[selected[0] + 2][selected[1] + 2]
      !== undefined && board[selected[0] + 2][selected[1] + 2][0] === null) {
      board[selected[0] + 2][selected[1] + 2][1] = 'redSquare';
      board[selected[0] + 2][selected[1] + 2][2] = '';
    }
    this.setState({ selected: [] });
  }

  selectRed(event) {
    const {
      board, selected, turn, autoJumpRed,
    } = this.state;
    if (turn === 'red') {
      const target = event.target.getAttribute('name');
      const columns = Number(target.charAt(1));
      const rows = Number(target.charAt(0));
      if (autoJumpRed) {
        if (selected.length > 0) {
          this.resetRedJump();
        } else {
          board[rows][columns][1] = 'selectedPiece';
          if (rows > 1 && columns > 1 && board[rows - 2][columns - 2] !== undefined && board[rows - 2][columns - 2][0] === null && board[rows][columns][0] === 'X' && (board[rows - 1][columns - 1][0] === 'o' || board[rows - 1][columns - 1][0] === 'O')) {
            board[rows - 2][columns - 2][1] = 'selectedSquare';
            board[rows - 2][columns - 2][2] = 'moveSelected';
          }
          if (rows > 1 && columns < 6 && board[rows - 2][columns + 2] !== undefined && board[rows - 2][columns + 2][0] === null && board[rows][columns][0] === 'X' && (board[rows - 1][columns + 1][0] === 'o' || board[rows - 1][columns + 1][0] === 'O')) {
            board[rows - 2][columns + 2][1] = 'selectedSquare';
            board[rows - 2][columns + 2][2] = 'moveSelected';
          }
          if (rows < 6 && columns > 1 && board[rows + 2][columns - 2] !== undefined && board[rows + 2][columns - 2][0] === null && (board[rows + 1][columns - 1][0] === 'o' || board[rows + 1][columns - 1][0] === 'O')) {
            board[rows + 2][columns - 2][1] = 'selectedSquare';
            board[rows + 2][columns - 2][2] = 'moveSelected';
          }
          if (rows < 6 && columns < 6 && board[rows + 2][columns + 2] !== undefined && board[rows + 2][columns + 2][0] === null && (board[rows + 1][columns + 1][0] === 'o' || board[rows + 1][columns + 1][0] === 'O')) {
            board[rows + 2][columns + 2][1] = 'selectedSquare';
            board[rows + 2][columns + 2][2] = 'moveSelected';
          }
          this.setState({ selected: [rows, columns] });
        }
      } else if (selected.length > 0) {
        this.resetRed();
      } else {
        board[rows][columns][1] = 'selectedPiece';
        if (rows > 0 && columns > 0 && board[rows - 1][columns - 1]
          !== undefined && board[rows - 1][columns - 1][0] === null && board[rows][columns][0] === 'X') {
          board[rows - 1][columns - 1][1] = 'selectedSquare';
          board[rows - 1][columns - 1][2] = 'moveSelected';
        }
        if (rows > 0 && columns < 7 && board[rows - 1][columns + 1]
          !== undefined && board[rows - 1][columns + 1][0] === null && board[rows][columns][0] === 'X') {
          board[rows - 1][columns + 1][1] = 'selectedSquare';
          board[rows - 1][columns + 1][2] = 'moveSelected';
        }
        if (rows < 7 && columns > 0 && board[rows + 1][columns - 1]
          !== undefined && board[rows + 1][columns - 1][0] === null) {
          board[rows + 1][columns - 1][1] = 'selectedSquare';
          board[rows + 1][columns - 1][2] = 'moveSelected';
        }
        if (rows < 7 && columns < 7 && board[rows + 1][columns + 1]
          !== undefined && board[rows + 1][columns + 1][0] === null) {
          board[rows + 1][columns + 1][1] = 'selectedSquare';
          board[rows + 1][columns + 1][2] = 'moveSelected';
        }
        this.setState({ selected: [rows, columns] });
      }
    }
  }

  resetBlack() {
    const { board, selected } = this.state;
    board[selected[0]][selected[1]][1] = 'redSquare';
    if (selected[0] > 0 && selected[1] > 0 && board[selected[0] - 1][selected[1] - 1]
      !== undefined && board[selected[0] - 1][selected[1] - 1][0] === null) {
      board[selected[0] - 1][selected[1] - 1][1] = 'redSquare';
      board[selected[0] - 1][selected[1] - 1][2] = '';
    }
    if (selected[0] > 0 && selected[1] < 7 && board[selected[0] - 1][selected[1] + 1]
      !== undefined && board[selected[0] - 1][selected[1] + 1][0] === null) {
      board[selected[0] - 1][selected[1] + 1][1] = 'redSquare';
      board[selected[0] - 1][selected[1] + 1][2] = '';
    }
    if (selected[0] < 7 && selected[1] > 0 && board[selected[0] + 1][selected[1] - 1]
      !== undefined && board[selected[0] + 1][selected[1] - 1][0] === null) {
      board[selected[0] + 1][selected[1] - 1][1] = 'redSquare';
      board[selected[0] + 1][selected[1] - 1][2] = '';
    }
    if (selected[0] < 7 && selected[1] < 7 && board[selected[0] + 1][selected[1] + 1]
      !== undefined && board[selected[0] + 1][selected[1] + 1][0] === null) {
      board[selected[0] + 1][selected[1] + 1][1] = 'redSquare';
      board[selected[0] + 1][selected[1] + 1][2] = '';
    }
    this.setState({ selected: [] });
  }

  resetBlackJump() {
    const { board, selected } = this.state;
    board[selected[0]][selected[1]][1] = 'redSquare';
    if (selected[0] > 1 && selected[1] > 1 && board[selected[0] - 2][selected[1] - 2]
      !== undefined && board[selected[0] - 2][selected[1] - 2][0] === null) {
      board[selected[0] - 2][selected[1] - 2][1] = 'redSquare';
      board[selected[0] - 2][selected[1] - 2][2] = '';
    }
    if (selected[0] > 1 && selected[1] < 6 && board[selected[0] - 2][selected[1] + 2]
      !== undefined && board[selected[0] - 2][selected[1] + 2][0] === null) {
      board[selected[0] - 2][selected[1] + 2][1] = 'redSquare';
      board[selected[0] - 2][selected[1] + 2][2] = '';
    }
    if (selected[0] < 6 && selected[1] > 1 && board[selected[0] + 2][selected[1] - 2]
      !== undefined && board[selected[0] + 2][selected[1] - 2][0] === null) {
      board[selected[0] + 2][selected[1] - 2][1] = 'redSquare';
      board[selected[0] + 2][selected[1] - 2][2] = '';
    }
    if (selected[0] < 6 && selected[1] < 6 && board[selected[0] + 2][selected[1] + 2]
      !== undefined && board[selected[0] + 2][selected[1] + 2][0] === null) {
      board[selected[0] + 2][selected[1] + 2][1] = 'redSquare';
      board[selected[0] + 2][selected[1] + 2][2] = '';
    }
    this.setState({ selected: [] });
  }

  selectBlack(event) {
    const {
      board, selected, turn, autoJumpBlack,
    } = this.state;
    if (turn === 'black') {
      const target = event.target.getAttribute('name');
      const columns = Number(target.charAt(1));
      const rows = Number(target.charAt(0));
      if (autoJumpBlack) {
        if (selected.length > 0) {
          this.resetBlackJump();
        } else {
          board[rows][columns][1] = 'selectedPiece';
          if (rows > 1 && columns > 1 && board[rows - 2][columns - 2] !== undefined && board[rows - 2][columns - 2][0] === null && (board[rows - 1][columns - 1][0] === 'x' || board[rows - 1][columns - 1][0] === 'X')) {
            board[rows - 2][columns - 2][1] = 'selectedSquare';
            board[rows - 2][columns - 2][2] = 'moveSelected';
          }
          if (rows > 1 && columns < 6 && board[rows - 2][columns + 2] !== undefined && board[rows - 2][columns + 2][0] === null && (board[rows - 1][columns + 1][0] === 'x' || board[rows - 1][columns + 1][0] === 'X')) {
            board[rows - 2][columns + 2][1] = 'selectedSquare';
            board[rows - 2][columns + 2][2] = 'moveSelected';
          }
          if (rows < 6 && columns > 1 && board[rows + 2][columns - 2] !== undefined && board[rows + 2][columns - 2][0] === null && board[rows][columns][0] === 'O' && (board[rows + 1][columns - 1][0] === 'x' || board[rows + 1][columns - 1][0] === 'X')) {
            board[rows + 2][columns - 2][1] = 'selectedSquare';
            board[rows + 2][columns - 2][2] = 'moveSelected';
          }
          if (rows < 6 && columns < 6 && board[rows + 2][columns + 2] !== undefined && board[rows + 2][columns + 2][0] === null && board[rows][columns][0] === 'O' && (board[rows + 1][columns + 1][0] === 'x' || board[rows + 1][columns + 1][0] === 'X')) {
            board[rows + 2][columns + 2][1] = 'selectedSquare';
            board[rows + 2][columns + 2][2] = 'moveSelected';
          }
          this.setState({ selected: [rows, columns] });
        }
      } else if (selected.length > 0) {
        this.resetBlack();
      } else {
        board[rows][columns][1] = 'selectedPiece';
        if (rows > 0 && columns > 0 && board[rows - 1][columns - 1]
          !== undefined && board[rows - 1][columns - 1][0] === null) {
          board[rows - 1][columns - 1][1] = 'selectedSquare';
          board[rows - 1][columns - 1][2] = 'moveSelected';
        }
        if (rows > 0 && columns < 7 && board[rows - 1][columns + 1]
          !== undefined && board[rows - 1][columns + 1][0] === null) {
          board[rows - 1][columns + 1][1] = 'selectedSquare';
          board[rows - 1][columns + 1][2] = 'moveSelected';
        }
        if (rows < 7 && columns > 0 && board[rows + 1][columns - 1]
          !== undefined && board[rows + 1][columns - 1][0] === null && board[rows][columns][0] === 'O') {
          board[rows + 1][columns - 1][1] = 'selectedSquare';
          board[rows + 1][columns - 1][2] = 'moveSelected';
        }
        if (rows < 7 && columns < 7 && board[rows + 1][columns + 1]
          !== undefined && board[rows + 1][columns + 1][0] === null && board[rows][columns][0] === 'O') {
          board[rows + 1][columns + 1][1] = 'selectedSquare';
          board[rows + 1][columns + 1][2] = 'moveSelected';
        }
        this.setState({ selected: [rows, columns] });
      }
    }
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
      <>
      <div>
        {/* <img onClick={this.settings} className="settings" src="images/settings.png"/>
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
          ))} */}
        {/* </div> */}

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
      </div>
    );
  }
}

export default App;
