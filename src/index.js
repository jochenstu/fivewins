import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Game fieldSize="144" players="4" />, document.getElementById('root'));
registerServiceWorker();