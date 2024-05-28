import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Root from "./root";
import DialogsRoot from "./dialogs_root";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

export function startApp() {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
          <QueryClientProvider client={queryClient}>
            <Root>
                <DialogsRoot>
                    <RouterProvider router={router} />
                    <ToastContainer autoClose={3000} />
                </DialogsRoot>
            </Root>
          </QueryClientProvider>
        </React.StrictMode>,
    )
}
