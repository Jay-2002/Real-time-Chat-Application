import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import AppRoutes from './config/routes.jsx'
import { ChatProvider } from './context/ChatContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    {/* for routing to be enabled we need to wrap our page in which we perform routing ysing BrowserRouter as documented in react-router that we did npm i */}

      <ChatProvider>

        {/*  Instead of having all routes in main.jsx, we created a separate file to handle just the route logic */}
        <AppRoutes />

      </ChatProvider>

    </BrowserRouter>
);
