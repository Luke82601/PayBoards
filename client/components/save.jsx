import React from 'react';

const Save = ({ save, saveView, exit }) => {
  if (!saveView) {
    return null;
  }
  return (
    <div className="saveBackground">
      <div className="head"><h2>PayBoards</h2></div>
      <div className="formBox">
        <h2>Save Game</h2>
        <label htmlFor="gameName">
          Game Name:
          <input type="text" className="gameName"/>
        </label>
        <div className="buttonGrid">
          <button type="button" onClick={() => {
            save(document.getElementsByClassName('gameName')[0].value);
            exit();
          }}>Save Game</button>
          <button type="button" onClick={exit}>cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Save;
