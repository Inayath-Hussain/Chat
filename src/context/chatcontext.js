import { createContext, useContext, useReducer } from "react";
import { userContext } from "./usercred";

export const chatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const usercontext = useContext(userContext)

    const INITIAL_STATE = {
        chatId: '',
        user: {}
    }

    const chatReducer = (state, action) => {
        if (action.type === 'CHANGE_USER') {
            return {
                user: action.payload,
                chatId: usercontext.userId > action.payload.uid ? usercontext.userId + action.payload.uid : action.payload.uid + usercontext.userId
            }
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

    return (
        <chatContext.Provider value={{ data: state, dispatch }}>
            {children}
        </chatContext.Provider>
    )
}