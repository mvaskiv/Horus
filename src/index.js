import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './schema/css/schema.min.css';
import './style/compli.css';
import './style/main.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
  
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
