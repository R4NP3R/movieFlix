import { createBrowserRouter } from "react-router"
import App from "../App"
import { HomePage } from "../pages/homePage"
import { MovieRegisterPage } from "../pages/movieRegisterPage"
import { NewMovieProvider } from "../context/NewMovie"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {path: "", element: <HomePage/>},
      {path: "createMovie", element: (
        <NewMovieProvider>
          <MovieRegisterPage/>
        </NewMovieProvider>
      )},
    ]
  },
])