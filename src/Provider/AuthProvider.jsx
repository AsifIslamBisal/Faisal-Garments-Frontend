import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const authContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Restore session on mount: /me, falling back to one refresh then retry.
    useEffect(() => {
        let cancelled = false;

        const restore = async () => {
            try {
                const res = await axios.get("/api/auth/me", { withCredentials: true });
                if (!cancelled) setUser(res.data.user);
            } catch (err) {
                if (err.response?.status === 401) {
                    try {
                        await axios.post("/api/auth/refresh", null, { withCredentials: true });
                        const res = await axios.get("/api/auth/me", { withCredentials: true });
                        if (!cancelled) setUser(res.data.user);
                    } catch {
                        if (!cancelled) setUser(null);
                    }
                } else {
                    if (!cancelled) setUser(null);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        restore();

        const handleSessionExpired = () => setUser(null);
        window.addEventListener("auth:session-expired", handleSessionExpired);

        return () => {
            cancelled = true;
            window.removeEventListener("auth:session-expired", handleSessionExpired);
        };
    }, []);

    //  Register (auto-login on success)
    const createUser = async (name, email, password, photo = "", phone = "") => {
        const res = await axios.post(
            "/api/auth/register",
            { name, email, password, photo, phone },
            { withCredentials: true }
        );
        setUser(res.data.user);
        return res.data.user;
    };

    //  Login
    const signIn = async (email, password) => {
        const res = await axios.post(
            "/api/auth/login",
            { email, password },
            { withCredentials: true }
        );
        setUser(res.data.user);
        return res.data.user;
    };

    //  Logout
    const logOut = async () => {
        try {
            await axios.post("/api/auth/logout", null, { withCredentials: true });
        } finally {
            setUser(null);
        }
    };

    //  Forgot Password
    const resetPassword = async (email) => {
        const res = await axios.post(
            "/api/auth/forgot-password",
            { email },
            { withCredentials: true }
        );
        return res.data;
    };

    //  Update Profile
    const updateUserProfile = async ({ name, photo }) => {
        const res = await axios.patch(
            "/api/users/me",
            { name, photo },
            { withCredentials: true }
        );
        setUser(res.data.user);
        return res.data.user;
    };

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        resetPassword,
        updateUserProfile,
    };

    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;
