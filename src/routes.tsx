import { Navigate, createBrowserRouter } from "react-router-dom";
import AuthPage from "./modules/auth/AuthPage"
import DashboardPage from "./modules/dashboard/DashboardPage";
import localStorageUtils from "./common/utils/localStorageUtil";

const Protected = ({ children }: any) => {
  const token = localStorageUtils.authToken.get()

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

const router = createBrowserRouter([
    {
        path: '/auth',
        element: <AuthPage />
    },
    {
      path: '/dashboard',
      element: <Protected><DashboardPage /></Protected>
    }
  ])

export default router
