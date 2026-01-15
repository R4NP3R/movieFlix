import { createBrowserRouter } from "react-router"
import App from "../App"
import { HomePage } from "../pages/homePage"
import { MovieManagerPage } from "../pages/movieManagerPage"
import { NewMovieProvider } from "../context/movieManager"
import { StreamingManagerPage } from "../pages/streamingManagerPage"
import { CategoryManagerPage } from "../pages/categoryManagerPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {path: "", element: <HomePage/>},
      {path: "manageMovies", element: (
        <NewMovieProvider>
          <MovieManagerPage/>
        </NewMovieProvider>
      )},
      {path: "manageStreamings", element: (
        <StreamingManagerPage/>
      )},
      {path: "managecategories", element: (
        <CategoryManagerPage/>
      )},
    ]
  },
])