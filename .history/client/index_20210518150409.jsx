import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import GuestApp from './components/GuestApp';

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'));
} else {
  ReactDOM.render(<GuestApp />, document.getElementById('guestApp'));
}
