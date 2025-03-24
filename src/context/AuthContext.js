import { createContext, useState, useEffect } from "react";
import axios from "axios";


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {

                const res = await axios.get("http://localhost:8000/api/users/me", { withCredentials: true });
                setUser(res.data.user);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post("http://localhost:8000/api/auth/login", { email, password }, { withCredentials: true });
            setUser(res.data.user);
            return { success: true, message: res.data.message };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Login failed" };
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await axios.post("http://localhost:8000/api/auth/logout", {}, { withCredentials: true });
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

