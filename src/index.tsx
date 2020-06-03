import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import 'react-redux-spinner/dist/react-redux-spinner.css';
import { Spinner } from 'react-redux-spinner';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

const target = document.querySelector('#root');

ReactDOM.render(
  <Provider store={store}>
    <Spinner config={{ trickleSpeed: 16 }} />
    <ReduxToastr timeOut={0} newestOnTop={true} preventDuplicates={true} position="bottom-right" transitionIn="fadeIn" transitionOut="fadeOut" progressBar={false} closeOnToastrClick={true} />
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  target
);