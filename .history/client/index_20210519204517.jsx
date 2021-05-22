import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Game from './Game.jsx';
import GuestApp from './components/GuestApp';

if (document.getElementById('app')) {
  ReactDOM.render(<Game />, document.getElementById('root'));
} else {
  ReactDOM.render(<GuestApp />, document.getElementById('guestApp'));
}
