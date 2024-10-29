import React from 'react';
import ReactDOM from 'react-dom';
import './Style/index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './Redux/authReducer';
import stores from './Redux/store';
// Tạo store Redux từ rootReducer
const store = createStore(rootReducer);

// Sử dụng ReactDOM.render để render ứng dụng
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store&&stores}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
