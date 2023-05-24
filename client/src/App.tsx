import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Pages from './page'

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" Component={Pages.Layout}>
      <Route index Component={Pages.Home} />
      <Route path="login" Component={Pages.Login}/>
      <Route path="register" Component={Pages.Register}/>
      <Route path="news/:newsId" Component={Pages.SingleNews}/>
      <Route path="createNews" Component={Pages.CreateNews}/>
    </Route>
  ))
  return (
    <RouterProvider router={router}/>
  )
}

export default App
