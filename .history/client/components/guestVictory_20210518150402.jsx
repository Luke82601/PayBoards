import React from 'react';

const GuestVictory = ({ victory, message, exit }) => {
  if (victory === '') {
    return null;
  }
  return (
    <div className="modalBackground victoryBackground">
      <div className="head"><h2>Checkers</h2></div>
      <div className="formBox">
        <div>
          <h1>{`${victory} wins!!!`}</h1>
          <h3>{message}</h3>
        </div>
        <button className="altButton" type="button" onClick={exit}>Back to Game</button>
      </div>
    </div>
  );
};

export default GuestVictory;
