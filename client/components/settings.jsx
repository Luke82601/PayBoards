import React from 'react';

const buttons = (modal, saveGame, changeGame, exit) => {
  if (modal) {
    return null;
  }
  return (
    <div>
      <button className="altButton" type="button" onClick={saveGame}>Save Game</button>
      <button className="altButton" type="button" onClick={() => { exit(); changeGame(); }}>Change Game</button>
    </div>
  );
};

const Settings = ({ settings, modal, exit, saveGame, changeGame }) => {
  if (!settings) {
    return null;
  }
  return (
    <div className="settingsBackground">
      <div className="head"><h2>PayBoards</h2></div>
      <div className="formBox">
        <h2>Settings</h2>
        {buttons(modal, saveGame, changeGame, exit)}
        <form action="/logout?_method=DELETE" method="POST">
          <button className="altButton" type="submit">Log Out</button>
        </form>
        <button onClick={exit} className="altButton" type="button">Exit</button>
      </div>
    </div>
  );
};

export default Settings;
