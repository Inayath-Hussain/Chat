import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useState, useEffect } from "react";
import { chatContext } from "../context/chatcontext";
import { db } from "../firebase";
import Message from "./message";

const Messages = () => {
    const [messages, setMessages] = useState([])
    const { data } = useContext(chatContext)

    useEffect(() => {
        if (data.chatId) {
            const unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
                doc.exists() && setMessages(doc.data().messages)
            })


            return () => {
                unsub()
            }
        }
    }, [data.chatId])

    return (
        <div className="messages">
            {messages?.map(m => (
                <Message message={m} key={m.id} />
            ))}
        </div>
    );
}

export default Messages;