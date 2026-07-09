import { FaAd, FaBook, FaHome, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { FaCalendar, FaEnvelope, FaList,} from "react-icons/fa6";
import { RiMenuSearchFill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";



import { CgProfile } from "react-icons/cg";
import useAdmin from "../hooks/useAdmin";
import useCart from "../hooks/useCart";



 
const Dashboard = () => {
    const [cart] = useCart();
    const [isAdmin] = useAdmin();
    
    
    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-gray-800 text-white">
                <ul className="menu p-4">
                    {
                        isAdmin ? <>
                         <li>
                        <NavLink to="/dashboard/dashboardInfo">
                        <FaHome></FaHome>
                        Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/myProfile">
                        <CgProfile></CgProfile>
                        My Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/Users">
                        <FaUsers></FaUsers>
                        
                        Manage users</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/userProducts">
                        
                        <FaBook></FaBook>
                        Manage Products</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/reviews">
                        <FaList></FaList>
                        All Reviews</NavLink>
                    </li>
                        </> : <>
                        
                        <li>
                        <NavLink to="/dashboard/Profile">
                        <FaHome></FaHome>
                        My Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/addProduct">
                        <FaCalendar></FaCalendar>
                        Add Product</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/MyProduct">
                        <FaShoppingCart></FaShoppingCart>
                        My Products  ({cart.length})</NavLink>
                    </li>
                        
                         </>
                    }
                    
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                        <FaHome></FaHome>
                        Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/products">
                        <RiMenuSearchFill></RiMenuSearchFill>
                        Products</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/about">
                        <FaEnvelope></FaEnvelope>
                        Contact</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;