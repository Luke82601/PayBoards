const Board = require('./board.js');
const Games = require('./gamesList.js');
const Users = require('./users.js');

const newBoard = {
  _id: '000000000000000000000000',
  name: 'newBoard',
  board: [
    [['wr1', 'blackSquare', 'selectRed'],
      ['wkn1', 'redSquare', 'selectRed'],
      ['wb1', 'blackSquare', 'selectRed'],
      ['wk', 'redSquare', 'selectRed'],
      ['wq', 'blackSquare', 'selectRed'],
      ['wb2', 'redSquare', 'selectRed'],
      ['wkn2', 'blackSquare', 'selectRed'],
      ['wr2', 'redSquare', 'selectRed']],

    [['p', 'redSquare', 'selectRed'],
      ['p', 'blackSquare', 'selectRed'],
      ['p', 'redSquare', 'selectRed'],
      ['p', 'blackSquare', 'selectRed'],
      ['p', 'redSquare', 'selectRed'],
      ['p', 'blackSquare', 'selectRed'],
      ['p', 'redSquare', 'selectRed'],
      ['p', 'blackSquare', 'selectRed']],

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

    [['o', 'redSquare', 'selectBlack'],
      ['o', 'blackSquare', 'selectBlack'],
      ['o', 'redSquare', 'selectBlack'],
      ['o', 'blackSquare', 'selectBlack'],
      ['o', 'redSquare', 'selectBlack'],
      ['o', 'blackSquare', 'selectBlack'],
      ['o', 'redSquare', 'selectBlack'],
      ['o', 'blackSquare', 'selectBlack']],

    [['o', 'blackSquare', 'selectBlack'],
      ['o', 'redSquare', 'selectBlack'],
      ['o', 'blackSquare', 'selectBlack'],
      ['o', 'redSquare', 'selectBlack'],
      ['o', 'blackSquare', 'selectBlack'],
      ['o', 'redSquare', 'selectBlack'],
      ['o', 'blackSquare', 'selectBlack'],
      ['o', 'redSquare', 'selectBlack']],
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