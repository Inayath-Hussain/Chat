import { createContext, useState } from "react";

export const searchContext = createContext()

export const SearchContextProvider = ({ children }) => {
    const [searchUser, setSearchUser] = useState(null);
    // console.log(searchUser)

    const value = {
        searchUser,
        setSearchUser
    }

    return (
        <searchContext.Provider value={value}>
            {children}
        </searchContext.Provider>
    )
}