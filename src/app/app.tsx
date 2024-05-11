import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Root from "./root";
import DialogsRoot from "./dialogs_root";
import { router } from "./router";

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