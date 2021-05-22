const Board = require('./board.js');
const Games = require('./gamesList.js');
const Users = require('./users.js');
// const Bishop = require('../pieces/Bishop.js');
// const King = require('../pieces/King.js');
// const Knight = require('../pieces/Knight.js');
// const Pawn = require('../pieces/Pawn.js');
// const Queen = require('../pieces/Queen.js');
// const Rook = require('../pieces/Rook.js');

// const br1 = new Rook(2);
// const br2 = new Rook(2);
// const bkn1 = new Knight(2);

const newBoard = {
  _id: '000000000000000000000000',
  name: 'newBoard',
  board: [
    [['br1', 'redSquare', 'selectRed'],
      ['bkn1', 'blackSquare', 'selectRed'],
      ['bb1', 'redSquare', 'selectRed'],
      ['bk', 'blackSquare', 'selectRed'],
      ['bq', 'redSquare', 'selectRed'],
      ['bb2', 'blackSquare', 'selectRed'],
      ['bkn2', 'redSquare', 'selectRed'],
      ['br2', 'blackSquare', 'selectRed']],

    [['bp', 'blackSquare', 'selectRed'],
      ['bp', 'redSquare', 'selectRed'],
      ['bp', 'blackSquare', 'selectRed'],
      ['bp', 'redSquare', 'selectRed'],
      ['bp', 'blackSquare', 'selectRed'],
      ['bp', 'redSquare', 'selectRed'],
      ['bp', 'blackSquare', 'selectRed'],
      ['bp', 'redSquare', 'selectRed']],

    [[null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', '']],

    [[null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', '']],

    [[null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', '']],

    [[null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', '']],

    [['wp', 'redSquare', 'selectBlack'],
      ['wp', 'blackSquare', 'selectBlack'],
      ['wp', 'redSquare', 'selectBlack'],
      ['wp', 'blackSquare', 'selectBlack'],
      ['wp', 'redSquare', 'selectBlack'],
      ['wp', 'blackSquare', 'selectBlack'],
      ['wp', 'redSquare', 'selectBlack'],
      ['wp', 'blackSquare', 'selectBlack']],

    [['wr1', 'blackSquare', 'selectBlack'],
      ['wkn1', 'redSquare', 'selectBlack'],
      ['wb1', 'blackSquare', 'selectBlack'],
      ['wk', 'redSquare', 'selectBlack'],
      ['wq', 'blackSquare', 'selectBlack'],
      ['wb2', 'redSquare', 'selectBlack'],
      ['wkn2', 'blackSquare', 'selectBlack'],
      ['wr2', 'redSquare', 'selectBlack']],
  ],
  black: 12,
  red: 12,
  turn: 'black',
  autoJumpRed: false,
  autoJumpBlack: false,
  playerOne: '',
  playerTwo: '',
};

const testBoard = {
  _id: '111111111111111111111111',
  name: 'Test',
  board: [
    [[null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', '']],

    [[null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', '']],

    [[null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', '']],

    [[null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      ['x', 'redSquare', 'selectRed'],
      [null, 'blackSquare', ''],
      [null, 'redSquare', '']],

    [[null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      ['o', 'redSquare', 'selectBlack'],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', '']],

    [[null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      ['x', 'redSquare', 'selectRed'],
      [null, 'blackSquare', ''],
      [null, 'redSquare', '']],

    [[null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      ['x', 'redSquare', 'selectRed'],
      [null, 'blackSquare', '']],

    [[null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      ['o', 'redSquare', 'selectBlack']],
  ],
  black: 2,
  red: 3,
  turn: 'red',
  autoJumpRed: true,
  autoJumpBlack: false,
  playerOne: 'Test One',
  playerTwo: 'Test Two',
};

const gameList = {
  _id: '60676bd61029f4fc9cd84a00',
  games: [{
    name: 'Test',
    gameId: '111111111111111111111111',
  }],
};


const user = {
  _id: '60676bd61029f4fc9cd84a00',
  id: '1617152727626',
  firstName: 'Test',
  lastName: 'Test',
  email: 'test@test.com',
  userName: 'Test',
  password: '$2b$10$hjXJ19Q3LeX.IJ9fB4Jhb.FpbGMRwNFQjefShHsEVQNOPplbfEjuO',
};

const makeBoard = () => {
  Board.create(newBoard)
    .then(() => process.exit())
    .catch((err) => console.log(err));
};

makeBoard();

const makeTestBoard = () => {
  Board.create(testBoard)
    .then(() => process.exit())
    .catch((err) => console.log(err));
};

makeTestBoard();

const makeGameList = () => {
  Games.create(gameList)
    .then(() => process.exit())
    .catch((err) => console.log(err));
};

makeGameList();

const makeUser = () => {
  Users.create(user)
    .then(() => process.exit())
    .catch((err) => console.log(err));
};

makeUser();