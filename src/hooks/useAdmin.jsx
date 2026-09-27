import useAuth from "./useAuth";

const useAdmin = () => {
    const { user, loading } = useAuth();
    const isAdmin = user?.role === "admin" || user?.role === "superadmin";
    return [isAdmin, loading];
};

export default useAdmin;
