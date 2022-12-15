import React, { useContext, useEffect, useState } from 'react';
import { doc, getDoc, onSnapshot, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { searchContext } from '../context/searchcontext';
import { userContext } from '../context/usercred';
import { chatContext } from '../context/chatcontext';
import { modalContext } from '../context/modalcontext';

const Chats = () => {
    const searchcontext = useContext(searchContext)
    const usercontext = useContext(userContext)
    const { setmodalImg } = useContext(modalContext)
    const { dispatch } = useContext(chatContext)
    const [chats, setChats] = useState([])

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, 'userchats', usercontext.userId), (doc) => {
                setChats(doc.data())
            })

            return () => {
                unsub();
            }
        }
        usercontext.userId && getChats()
    }, [usercontext.userId])


    const addUser = async (details) => {
        const combinedId = usercontext.userId > details.uid ? usercontext.userId + details.uid : details.uid + usercontext.userId
        const res = await getDoc(doc(db, 'chats', combinedId))
        if (!res.exists()) {
            await setDoc(doc(db, 'chats', combinedId), { messages: [] })

            await updateDoc(doc(db, 'userchats', usercontext.userId), {
                [combinedId + ".userInfo"]: {
                    uid: details.uid,
                    displayName: details.displayName,
                    photoURL: details.photoURL
                },
                [combinedId + ".date"]: serverTimestamp()
            })
            await updateDoc(doc(db, 'userchats', details.uid), {
                [combinedId + ".userInfo"]: {
                    uid: usercontext.userId,
                    displayName: usercontext.userName,
                    photoURL: usercontext.userPhoto
                },
                [combinedId + ".date"]: serverTimestamp()
            })
        }
        console.log(details, '==>', usercontext)
    }

    const handleSelect = (detail) => {
        dispatch({ type: "CHANGE_USER", payload: detail })
    }

    return (
        <React.Fragment>
            {searchcontext.searchUser &&
                searchcontext.searchUser.map((each) =>
                (
                    <div key={each.uid} className="chats list" >
                        <img src={each.photoURL} alt="" referrerPolicy='no-referrer' onClick={() => setmodalImg(each.photoURL)}></img>
                        <div className="chatsdetail" onClick={() => addUser(each)}>
                            <p className='names'>{each.displayName}</p>
                        </div>
                    </div>
                )
                )}

            <hr />

            {Object.entries(chats).sort((a, b) => b[1].date - a[1].date).map((chat) => (
                <div className="chats list" key={chat[0]} >
                    <img src={chat[1].userInfo.photoURL} alt="" referrerPolicy='no-referrer'
                        onClick={() => setmodalImg(chat[1].userInfo.photoURL)} ></img>
                    <div className="chatsdetail" onClick={() => handleSelect(chat[1].userInfo)}>
                        <p className='names'>{chat[1].userInfo.displayName}</p>
                        {chat[1].lastMessage && <p className='lstmsg'>{chat[1].lastMessage.text}</p>}
                    </div>
                </div>
            ))}
        </React.Fragment>
    );
}

export default Chats;