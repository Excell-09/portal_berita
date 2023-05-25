import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Pages from "./page";
import { useAuth } from "./Auth/AuthProvider";
import { Navigate } from "react-router-dom";

function App() {
  const { user } = useAuth();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" Component={Pages.Layout}>
        <Route index Component={Pages.Home} />
        <Route
          path="login"
          Component={Pages.Login}
          loader={() => {
            if (Boolean(user)) {
              <Navigate to={"/"} />;
              return null;
            }
            return null;
          }}
        />
        <Route path="register" Component={Pages.Register} />
        <Route path="news/:newsId" Component={Pages.SingleNews} />
        <Route path="create" Component={Pages.CreateNews} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
