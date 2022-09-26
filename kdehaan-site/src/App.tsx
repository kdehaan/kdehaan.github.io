import React from 'react';
import { ReactDOM } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createHashRouter,
} from "react-router-dom";
import './App.css';
import Root from './routes/Root'
import NotFound from './routes/NotFound';
import SpeedrunChart from './routes/SpeedrunChart';

const router = createHashRouter([
  {
    path: "/",
    element: <SpeedrunChart/>,
    errorElement: <NotFound/>,
  },
  // {
  //   path: "/",
  //   element: <Root/>,
  //   errorElement: <NotFound/>,
  // }

  // {
  //   path: "/",
  //   element: <Root />,
  //   children: [
  //     {
  //       path: "chart",
  //       element: <SpeedrunChart />,
  //     },
  //   ],
  // },
]);


function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  );
}

export default App;
