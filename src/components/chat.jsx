import Cnavbar from "./c-navbar";
import Messageinput from "./messageinput";
import Messages from "./messages";

const Chat = () => {
    return (
        <div className="chat">
            <Cnavbar />
            <Messages />
            <Messageinput />
        </div>
    );
}

export default Chat;