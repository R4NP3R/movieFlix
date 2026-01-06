import { createBrowserRouter } from "react-router"
import App from "../App"
import { HomePage } from "../pages/homePage"
import { MovieRegisterPage } from "../pages/movieRegisterPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {path: "", element: <HomePage/>},
      {path: "createMovie", element: <MovieRegisterPage/>},
    ]
  },
])