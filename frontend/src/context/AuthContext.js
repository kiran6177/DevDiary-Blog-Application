"use client"
import React, { useContext, useState } from "react";

const Context = React.createContext(null);

export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null);
    
    return (
        <Context.Provider value={{user,setUser}}>
            {children}
        </Context.Provider>
    )
}

export const useAuth = () => useContext(Context); 