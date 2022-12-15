import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { chatContext } from "../context/chatcontext";
import { userContext } from "../context/usercred";
import { db, storage } from "../firebase";
import "react-toastify/dist/ReactToastify.css"


const Messageinput = () => {
    const [text, setText] = useState('')
    const [img, setImg] = useState(null)

    const usercontext = useContext(userContext)
    const { data } = useContext(chatContext)

    const SelectImg = (e) => {
        setImg(e.target.files[0])
        toast.success(`${e.target.files[0].name} selected`)
    }

    const handleSend = async () => {
        if (img) {
            const storageRef = ref(storage, uuid())
            uploadBytesResumable(storageRef, img).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    await updateDoc(doc(db, 'chats', data.chatId), {
                        messages: arrayUnion({
                            id: uuid(),
                            text,
                            senderId: usercontext.userId,
                            date: Timestamp.now(),
                            img: downloadURL
                        })
                    })
                })
            })
        }
        else {
            await updateDoc(doc(db, 'chats', data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: usercontext.userId,
                    date: Timestamp.now()
                })
            })
        }


        const lastMessage = (img && text === '') ? 'Image' : text

        await updateDoc(doc(db, 'userchats', usercontext.userId), {
            [data.chatId + ".lastMessage"]: {
                text: lastMessage
            },
            [data.chatId + ".date"]: serverTimestamp()
        })
        await updateDoc(doc(db, 'userchats', data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text: lastMessage
            },
            [data.chatId + ".date"]: serverTimestamp()
        })

        setText('')
        setImg(null)
    }

    return (
        <React.Fragment>
            <ToastContainer />
            <div className="msgctn">
                <input type="text" className="msginput" placeholder="Type a message" value={text}
                    onChange={e => setText(e.currentTarget.value)} onKeyDown={e => e.code === 'Enter' ? handleSend() : null} />
                <input type='file' onChange={SelectImg} style={{ display: 'none' }} id='file' disabled={data.chatId ? false : true} />
                <label htmlFor="file" className='fa'><div className="imageicon">&#xf03e;</div></label>
                <button className="send fa" onClick={handleSend} disabled={data.chatId ? false : true}>Send &#xf1d9;</button>
            </div>
        </React.Fragment>
    );
}

export default Messageinput;