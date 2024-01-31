import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './modules/app/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './modules/app/store';
import { Toast } from './modules/app/components/Toast';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Toast>
        <App />
      </Toast>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
