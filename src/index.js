import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();


// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import rootReducer from './reducers/index';

// const store = createStore(rootReducer);
// store.subscribe(() =>
//   console.log(store.getState())
// );

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>

//     <Provider store={store}>
//     <App />
//     </Provider>
//   </React.StrictMode>
// );

// reportWebVitals();