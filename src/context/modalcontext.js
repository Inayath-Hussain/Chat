import { createContext, useState } from "react";

export const modalContext = createContext()

const ModalContextProvider = ({ children }) => {
    const [modalImg, setmodalImg] = useState(null)
    const value = {
        modalImg,
        setmodalImg
    }

    return (
        <modalContext.Provider value={value}>
            {children}
        </modalContext.Provider>
    );
}

export default ModalContextProvider;
// export const modalContext = useState(null)