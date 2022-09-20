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
import SpeedrunChart from './routes/SpeedrunChart';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <NotFound/>,
  },
  {
    path: "/speedrunchart",
    element: <SpeedrunChart/>,
    errorElement: <NotFound/>,
  },
]);


function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
