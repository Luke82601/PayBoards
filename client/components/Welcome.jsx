import React from 'react';

const Welcome = ({ username, modal, gameList, victory, message, savedView, changeView, changeVictory, makeBoard, onClose }) => {
  if (!modal) {
    return null;
  }
  if (victory !== '') {
    return (
      <div className="modalBackground victoryBackground">
        <div className="head"><h2>Checkers</h2></div>
        <div className="formBox">
          <div>
            <h1>{`${victory} wins!!!`}</h1>
            <h3>{message}</h3>
          </div>
          <button className="altButton" type="button" onClick={() => {
            changeView();
            changeVictory();
          }}>Back to Welcome Page</button>
        </div>
      </div>
    );
  }
  if (savedView) {
    return (
      <div className="modalBackground">
        <div className="head"><h2>Checkers</h2></div>
        <div className="formBox">
          <h2>Select Game</h2>
          <div>
            {gameList.map((game) => (
              <button key={game.gameId} name={game.gameId} className="altButton" type="button" onClick={() => {
                makeBoard(game.gameId);
                onClose();
              }}>{game.name}</button>
            ))}
          </div>
          <button className="altButton back" type="button" onClick={changeView}>Back to Welcome Page</button>
        </div>
      </div>
    );
  }
  return (
    <div className="modalBackground">
      <div className="head"><h2>Checkers</h2></div>
      <div className="formBox">
        <h1>{`Welcome ${username}!`}</h1>
        <h2>Start Game</h2>
        <label htmlFor="playerTwo">
          Player Two Name:
          <input type="text" className="playerTwo" />
        </label>
        <div className="buttonGrid">
          <button type="button" onClick={changeView}>Saved Games</button>
          <button type="button" onClick={() => {
            makeBoard('000000000000000000000000', document.getElementsByClassName('playerTwo')[0].value);
            onClose();
          }}>New Game</button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
