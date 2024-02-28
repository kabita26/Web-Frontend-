import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./Components/login.tsx";
import Register from "./Components/Register.tsx";
import Home from "./Components/Home.tsx";
import ProductDetails from "./Components/ProductDetails.tsx";
import ProductList from "./Components/ProductList.tsx";
import ContactUs from "./Components/ContactUs.tsx";
import CartPage from "./Components/CartPage.tsx";
import Admin from "./Admin/Admin.tsx";
import Upload from "./Admin/Upload.tsx";
import Detail from "./Admin/Detail.tsx";
import Manage from "./Admin/Manage.tsx";
import Edit from "./Admin/Edit.tsx";


const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/Register",
        element: <Register />,
    },
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/products",
        element: <ProductList products={[]} />,
    },
    {
        path: "/admin",
        element: <Admin />,
    },
    {
        path: "/item/retrieve-item-by-id/:id",
        element: <ProductDetails />,
    },
    {
        path: "/cart",
        element: <CartPage />,
    },
    {
        path: "/contact",
        element: <ContactUs />,
    },
    {
        path: "/comment",
        element: <Comment />,
    },
    {
        path: "/admin/manage",
        element: <Manage />,
    },
    {
        path: "/edit/:id",
        element: <Edit />,
    },
    {
        path: "/admin/add",
        element: <Upload />,
    },
    {
        path: "/admin/orders",
        element: <Detail />,
    },


]);

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </>
    );
}

export default App;
