import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

   const [user, setUser] = useState(null);
   const [error, setError] = useState("");

   const login = async (credentials) => {
    try {
    const response = await fetch("http://localhost:5000/login", {
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
    
    setError("");
    setUser(data.user);

    localStorage.setItem("token", data.access_token);

      } catch (error) {
        console.error(error.message);
         setError(error.message);
    }
};


    /*const logout = () => {
        setUser(null);
    };*/

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                error,
                /*logout */
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}