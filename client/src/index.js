import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import SetupProfile from './pages/SetupProfile';
import AppContext from './contexts/AppContext';
import Search from './components/Search';
import Inbox from './components/Inbox';
import Friends from './components/Friends';
import User from './components/User';
import Settings from './components/Settings';
const router=createBrowserRouter([
  {
    path:'/login',
    element:<Login />
  },{
    path:'/signup',
    element:<SignUp />
  },{
    path:'/',
    element:<Home />,
    children:[
      {
        path:'',
        element:<Search />
      },{
        path:'inbox',
        element:<Inbox />
      },
      {
        path:'friends',
        element:<Friends />
      },
      {
        path:'user/:id',
        element:<User />
      },{
        path:'/profile',
        element:<Settings />
      }
    ]
  },{
    path:'/setup_profile',
    element:<SetupProfile />
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <AppContext>
      <RouterProvider router={router} />
    </AppContext>
  </React.StrictMode>
);

