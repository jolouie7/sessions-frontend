import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import ActionCable from 'actioncable';
import App from './App';
import * as serviceWorker from './serviceWorker'; // might need to change this
import { BrowserRouter as Router} from 'react-router-dom';

// const cable = ActionCable.createConsumer('ws://localhost:3000/cable')
ReactDOM.render((
  <div>
  <Router>
    
   
       <App />
    
    
    </Router>
    </div>),
  document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
