import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap/dist/react-bootstrap.min.js';
import 'react-toastify/dist/ReactToastify.css'

import { store } from './app/store';
import { App } from './components/App';

import './styles/global.css'
// import './styles/index.css'
import './styles/typography.css'

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <HashRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </HashRouter>
    </React.StrictMode>
);

// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { store } from './app/store';
// import App from './App_old';
// import './styles/index_old.css'

// const container = document.getElementById('root');
// const root = createRoot(container);

// root.render(
//     <React.StrictMode>
//         <Provider store={store}>
//         <App />
//         </Provider>
//     </React.StrictMode>
// );