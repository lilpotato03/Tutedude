import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import SetupProfile from './pages/SetupProfile';
const router=createBrowserRouter([
  {
    path:'/login',
    element:<Login />
  },{
    path:'/signup',
    element:<SignUp />
  },{
    path:'/',
    element:<Home />
  },{
    path:'/setup_profile',
    element:<SetupProfile />
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

