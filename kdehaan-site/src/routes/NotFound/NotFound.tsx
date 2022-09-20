import { useRouteError } from "react-router-dom";


interface RouteError {
  statusText: string;
  message: string;
}

function NotFound() {

  const error = (useRouteError() as RouteError)
  console.error(error);

  return (
    <div id="error-page">
      <h1>404</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );

}


export default NotFound