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

    const navLinkCls = ({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${isActive ? "bg-white/10 text-white" : "text-gray-300 hover:bg-white/10 hover:text-white"}`;

    
    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-gray-800 text-white">
                <ul className="flex flex-col gap-1 p-4">
                    {
                        isAdmin ? <>
                         <li>
                        <NavLink to="/dashboard/dashboardInfo" className={navLinkCls}>
                        <FaHome></FaHome>
                        Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/myProfile" className={navLinkCls}>
                        <CgProfile></CgProfile>
                        My Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/Users" className={navLinkCls}>
                        <FaUsers></FaUsers>
                        
                        Manage users</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/userProducts" className={navLinkCls}>
                        
                        <FaBook></FaBook>
                        Manage Products</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/reviews" className={navLinkCls}>
                        <FaList></FaList>
                        All Reviews</NavLink>
                    </li>
                        </> : <>
                        
                        <li>
                        <NavLink to="/dashboard/Profile" className={navLinkCls}>
                        <FaHome></FaHome>
                        My Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/addProduct" className={navLinkCls}>
                        <FaCalendar></FaCalendar>
                        Add Product</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/MyProduct" className={navLinkCls}>
                        <FaShoppingCart></FaShoppingCart>
                        My Products  ({cart.length})</NavLink>
                    </li>
                        
                         </>
                    }
                    
                    {/* shared nav links */}
                    <div className="border-t border-white/10 my-2"></div>
                    <li>
                        <NavLink to="/" className={navLinkCls}>
                        <FaHome></FaHome>
                        Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" className={navLinkCls}>
                        <RiMenuSearchFill></RiMenuSearchFill>
                        Products</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/about" className={navLinkCls}>
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