import { createContext, useEffect, useState } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    signOut,
    updateProfile,
    onAuthStateChanged,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const authContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [confirmationResult, setConfirmationResult] = useState(null);

    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    //  Email Register
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    //  Email Login
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    //  Google Login
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    //  Reset Password
    const resetPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    };

    //  Logout
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    //  Update Profile
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    };

    //  SEND OTP
    const sendOtp = async (phone) => {
        setLoading(true);

        window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            { size: "invisible" },
            auth
        );

        try {
            const confirmation = await signInWithPhoneNumber(
                auth,
                phone,
                window.recaptchaVerifier
            );

            setConfirmationResult(confirmation);
            setLoading(false);

            return true;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    //  VERIFY OTP (Login/Register same)
    const verifyOtp = async (otp) => {
        if (!confirmationResult) throw new Error("OTP not sent");

        setLoading(true);
        try {
            const result = await confirmationResult.confirm(otp);
            setLoading(false);
            return result;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    //  Auth State
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                const userInfo = {
                    email: currentUser.email || currentUser.phoneNumber
                };

                axiosPublic.post("/jwt", userInfo).then((res) => {
                    if (res.data.token) {
                        localStorage.setItem("access-token", res.data.token);
                    }
                    setLoading(false);
                });
            } else {
                localStorage.removeItem("access-token");
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [axiosPublic]);

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        resetPassword,
        logOut,
        updateUserProfile,
        sendOtp,     
        verifyOtp    
    };

    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;