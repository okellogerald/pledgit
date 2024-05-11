import React from 'react'
import ReactDOM from 'react-dom/client'

import './app/globals.css'

import './demos/ipc'
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import DialogsRoot from './app/dialogs_root';
import Root from './app/root';
import { router } from './app/router';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Root>
            <DialogsRoot>
                <RouterProvider router={router} />
                <ToastContainer autoClose={3000} />
            </DialogsRoot>
        </Root>
    </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
