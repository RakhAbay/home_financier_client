import { Navigate, createBrowserRouter } from "react-router-dom";
import AuthPage from "./modules/auth/AuthPage";
import CategoryPage from "./modules/dashboard/CategoryPage";
import localStorageUtils from "./common/utils/localStorageUtil";
import LayoutStructure from "./layout/layoutStructure";
import InOutComePage from "./modules/inOutcome/InOutCome";
import { ChatBotContainer } from "./common/components/ChatbotContainer";
import FinancialGoalsPage from "./modules/financialGoals/FinancialGoalsPage";

const Protected = ({ children }: any) => {
    const token = localStorageUtils.authToken.get();

    if (!token) {
        return <Navigate to="/auth" replace />;
    }

    return children;
};

const router = createBrowserRouter([
    {
        path: "/auth",
        element: <AuthPage />,
    },
    {
        path: "/main",
        element: (
            <Protected>
                <LayoutStructure />
            </Protected>
        ),
        children: [
            {
                path: "/main/category",
                element: (
                    <>
                        <CategoryPage />
                        <ChatBotContainer />
                    </>
                ),
            },
            {
                path: "/main/in-out-come",
                element: (
                    <>
                        <InOutComePage />
                        <ChatBotContainer />
                    </>
                ),
            },
            {
                path: "/main/financial-goals",
                element: (
                    <>
                        <FinancialGoalsPage />
                        <ChatBotContainer />
                    </>
                ),
            },
        ],
    },
]);

export default router;
