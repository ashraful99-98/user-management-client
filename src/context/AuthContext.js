// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         if (storedUser) {
//             setUser(JSON.parse(storedUser));
//         }
//     }, []);

//     const login = async (email, password) => {
//         try {
//             const response = await axios.post(
//                 "http://localhost:8000/api/auth/login",
//                 { email, password },
//                 { withCredentials: true }
//             );

//             setUser(response.data.user);
//             localStorage.setItem("user", JSON.stringify(response.data.user));

//             return { success: true, message: response.data.message };
//         } catch (error) {
//             return { success: false, message: error.response?.data?.message || "Login failed" };
//         }
//     };

//     const logout = () => {
//         setUser(null);
//         localStorage.removeItem("user");
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;


// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);

//     // Check for logged-in user on page load
//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const res = await axios.get("http://localhost:8000/api/auth/user", { withCredentials: true });
//                 setUser(res.data.user);
//             } catch (error) {
//                 console.error("Error fetching user:", error);
//             }
//         };
//         fetchUser();
//     }, []);

//     const login = async (email, password) => {
//         try {
//             const res = await axios.post("http://localhost:8000/api/auth/login", { email, password }, { withCredentials: true });
//             setUser(res.data.user);
//             return { success: true, message: res.data.message };
//         } catch (error) {
//             return { success: false, message: error.response?.data?.message || "Login failed" };
//         }
//     };

//     const logout = () => {
//         setUser(null);
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;


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

    // Login function that will be called by the Login page
    const login = async (email, password) => {
        try {
            const res = await axios.post("http://localhost:8000/api/auth/login", { email, password }, { withCredentials: true });
            setUser(res.data.user); // Update the user state after login
            return { success: true, message: res.data.message };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Login failed" };
        }
    };

    // Logout function to clear user data and token
    // const logout = async () => {
    //     try {
    //         await axios.post("http://localhost:8000/api/auth/logout", {}, { withCredentials: true });
    //         setUser(null); // Clear user state
    //     } catch (error) {
    //         console.error("Logout failed:", error);
    //     }
    // };

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

