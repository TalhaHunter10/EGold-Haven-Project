import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { store } from './redux/store';
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import ChatProvider from './components/chat/ChatProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <ChatProvider>
    <App />
    </ChatProvider>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


