import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter,createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from './pages/Login';
import SignUp from './pages/SignUp';
const router=createBrowserRouter([
  {
    path:'/login',
    element:<Login />
  },{
    path:'/signup',
    element:<SignUp />
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

