import React from "react";
import { Route, Routes } from "react-router";
import App from "../App";
import ChatPage from "../components/ChatPage";

const AppRoutes = () => {
    return (
        // Instead of having all routes in main.jsx, we created a separate file to handle just the route logic
        <Routes>
            <Route path='/' element={ <App /> } />
            <Route path='/chat' element={ <ChatPage /> } />
            <Route path='/about' element={ <h1>This is About Page</h1> } />
        </Routes>
    );
};

export default AppRoutes;