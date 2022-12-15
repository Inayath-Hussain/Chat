import SideBar from "./sidebar";
import Chat from "./chat";
import Modal from "./modal";

const Main = () => {
    return (
        <div className="home">
            <div className="container1">
                <SideBar />
                <Chat />
                <Modal />
            </div>
        </div>
    );
}

export default Main;