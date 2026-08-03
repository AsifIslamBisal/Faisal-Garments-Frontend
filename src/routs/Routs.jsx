import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../components/Home";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import Shop from "../components/shop/Shop";
import ProductDetail from "../components/product/ProductDetail";
import CartPage from "../components/cart/CartPage";
import Checkout from "../components/checkout/Checkout";
import OrderSuccess from "../components/order/OrderSuccess";
import Profile from "../components/profile/Profile";
import Orders from "../components/orders/Orders";
import OrderDetail from "../components/orders/OrderDetail";
import Contact from "../components/Contact";
import About from "../components/About";
import SizeGuide from "../components/SizeGuide";
import ScrollToTop from "../ScroollToTop";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Deshboard";
import PrivacyPolicy from "../components/PrivacyPolicy";
import AllBranch from "../components/AllBranch";
import OrderProcess from "../components/OrderProcess";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <>
        <ScrollToTop/>
        <MainLayout/>
        </>
    ),
    errorElement:<ErrorPage/>,
    children: [
        {
            path: '/',
            element: <Home/>,
        },
        {
            path: '/product',
            element: <Shop/>,
        },
        {
            path: '/shop',
            element: <Shop/>,
        },
        {
            path: '/product/:slug',
            element: <ProductDetail/>,
        },
        {
            path: '/cart',
            element: <CartPage/>,
        },
        {
            path: '/checkout',
            element: <Checkout/>,
        },
        {
            path: '/order-success/:id',
            element: <OrderSuccess/>,
        },
        {
            path: '/profile',
            element: <PrivateRoute><Profile/></PrivateRoute>,
        },
        {
            path: '/orders',
            element: <PrivateRoute><Orders/></PrivateRoute>,
        },
        {
            path: '/orders/:id',
            element: <PrivateRoute><OrderDetail/></PrivateRoute>,
        },
        {
            path: '/about',
            element: <About/>,
        },
        {
            path: '/contact',
            element: <Contact/>,
        },
        {
            path: '/login',
            element: <Login/>,
        },
        {
            path: '/register',
            element: <Register/>,
        },
        {
            path: '/Branch',
            element: <AllBranch/>,
        },
        {
            path: '/sizeGuide',
            element: <SizeGuide/>,
        },
        {
            path: '/orderProcess',
            element:<OrderProcess/>,
        },
        {
            path: '/privacy',
            element: <PrivacyPolicy/>,
        },
          ]
        },
        // Dashboard routs
        {
          path: 'dashboard',
          element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute> ,
          children: [
            // normal user routes
            // {
            //   path:'userHome',
            //   element: <UserHome></UserHome>
            // },
            // {
            //   path:'cart',
            //   element: <Cart></Cart>
            // },
            // {
            //   path:'Payment',
            //   element: <Payment></Payment>
            // },
            // {
            //   path:'PaymentHistory',
            //   element: <PaymentHistory></PaymentHistory>
            // },
            // admin only routes....
            // {
            //   path: 'adminHome',
            //   element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            // },
            // {
            //   path: 'addItems',
            //   element: <AdminRoute><AddItems></AddItems></AdminRoute>
            // },
            // {
            //   path: 'manageItems',
            //   element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
            // },
            // {
            //   path: 'updateItem/:id',
            //   element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
            //   loader: ({params}) => fetch(`https://the-hungry-fox-server.vercel.app/menu/${params.id}`)
            // },
            // {
            //   path: 'users',
            //   element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            // },
    ]
  },
]);
