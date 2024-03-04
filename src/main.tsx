import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <div>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
        <ToastContainer />
    </div>
);
