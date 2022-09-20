import React from 'react';
import { ReactDOM } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import './App.css';
import Root from './routes/Root'
import NotFound from './routes/NotFound';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <NotFound/>,
  },
]);


function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
