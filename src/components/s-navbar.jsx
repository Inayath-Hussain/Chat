import { useContext } from 'react';
import { signOut } from "firebase/auth";
import { userContext } from '../context/usercred';
import { searchContext } from '../context/searchcontext';
import { modalContext } from '../context/modalcontext';
import { auth } from '../firebase';

const Snavbar = () => {
    const user = useContext(userContext)
    const search = useContext(searchContext)
    const modal = useContext(modalContext)

    const signout = async () => {
        await signOut(auth).then(
            search.setSearchUser(null),
            localStorage.clear(),
            window.location = '/login'
        )

    }
    return (
        <div className="snavbar">
            <div className="chats" style={{ cursor: 'default' }}>
                <img src={user.userPhoto} alt="" referrerPolicy='no-referrer'
                    onClick={() => modal.setmodalImg(user.userPhoto)} style={{ cursor: 'pointer' }}></img>
                <p>{user.userName}</p>
            </div>
            <button onClick={() => signout()} className="logoutbtn">Log Out</button>
        </div>
    );
}

export default Snavbar;