import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Game from './components/Game.jsx';
import GuestApp from './components/GuestApp';

if (document.getElementById('root')) {
  ReactDOM.render(<Game />, document.getElementById('root'));
}
