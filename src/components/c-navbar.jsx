import { useContext } from 'react';
import { chatContext } from '../context/chatcontext';

const Cnavbar = () => {
    const { data } = useContext(chatContext)
    return (
        <div className="cnavbar">
            <div className="chats header">
                {data.user?.photoURL && <img src={data.user.photoURL} alt="" />}
                <p>{data.user.displayName}</p>
            </div>
        </div>
    );
}

export default Cnavbar;