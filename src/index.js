import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import buildFontAwesomeLibrary from './buildFontAwesomeLibrary';

buildFontAwesomeLibrary();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
