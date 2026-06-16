import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [error, setError] = useState("");
    const path = "http://localhost:5000";
    

    const login = async (credentials) => {
        try {

            setError("");

            const response = await fetch(path + "/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || "Error al iniciar sesion");
            }


            setUser(data.user);
            localStorage.setItem("token", data.acces_token);
            localStorage.setItem("user", JSON.stringify(data.user));
            return true;

        } catch (error) {
            console.error(error.message);
            setError(error.message);
            return false;
        }
    };


    const logout = () => {
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
};


const changePassword = async (credentials) => {

    setError(null);

    try {

        const token = localStorage.getItem("token");
        const response = await fetch(
            path +"/change-password",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(credentials)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            setError(data.msg);
            return false;
        }

        return true;

    } catch (error) {

        setError("Server error");
        return false;
    }
};

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                error,
                logout,
                changePassword,
            }}
        >
            {children}
            
            </AuthContext.Provider>
    );
}