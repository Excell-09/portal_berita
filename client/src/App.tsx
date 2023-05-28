import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom";
import Pages from "./page";
import { useAuth } from "./Auth/AuthProvider";
import { redirect } from "react-router-dom";

function App() {
  const { user } = useAuth();

  const checkUserRedirect = () => {
    if (Boolean(user)) {
      return redirect("/");
    }
    return null;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" Component={Pages.Layout}>
        <Route index element={<Navigate to={"home?category=all"} />} />
        <Route path="home" Component={Pages.Home} />
        <Route path="login" Component={Pages.Login} loader={checkUserRedirect} />
        <Route path="register" Component={Pages.Register} loader={checkUserRedirect} />
        <Route path="news/:newsId" Component={Pages.SingleNews} />
        <Route
          path="create"
          Component={Pages.CreateNews}
          loader={() => {
            if (!Boolean(user)) {
              return redirect("/login");
            }
            return null;
          }}
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
