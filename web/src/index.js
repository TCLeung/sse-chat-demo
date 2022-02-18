import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {MantineProvider} from '@mantine/core';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
      <MantineProvider withNormalizeCSS withGlobalStyles theme={{colorScheme: 'dark'}}>
        <App/>
      </MantineProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
