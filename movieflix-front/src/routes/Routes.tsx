import { createBrowserRouter } from "react-router"
import App from "../App"
import { HomePage } from "../pages/homePage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {path: "", element: <HomePage/>}
    ]
  }

])