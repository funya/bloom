import React from 'react';
import ReactDOM from 'react-dom';

//css
import 'semantic-ui-css/semantic.min.css';
import './index.css';

//app
import App from './components/App';

//redux
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducer from './reducers'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  
)

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
