import React, { useRef, useContext, useEffect } from "react";
import { chatContext } from "../context/chatcontext";
import { userContext } from "../context/usercred";


const Message = ({ message }) => {

    const usercontext = useContext(userContext)
    const { data } = useContext(chatContext)

    const ref = useRef()

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" })
    }, [message])

    const displayDate = (date) => {
        const time = date.toDate()
        return time.toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        })
    }

    const displayTime = (date) => {
        const time = date.toDate()

        return time.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit'
        })

    }

    console.log(message)
    return (
        <React.Fragment>
            {(message.text || message.img) && <div ref={ref} className={`${message.senderId === usercontext.userId ? 'messagesent' : 'messagereceived'}`}>
                <div className="messageinfo">
                    <img src={message.senderId === usercontext.userId ? usercontext.userPhoto : data.user.photoURL} alt="" referrerPolicy="no-referrer"></img>
                    <span className="time">{displayTime(message.date)}</span>
                    <span className="time">{displayDate(message.date)}</span>
                </div>
                <div className="messagecontent">
                    {message.text && <p>{message.text}</p>}
                    {message.img && <img src={message.img} alt="" referrerPolicy="no-referrer"></img>}
                </div>
            </div>}
        </React.Fragment>
    );
}

export default Message;