import Snavbar from "./s-navbar";
import SearchBar from "./searchbar";
import Chats from "./chats";

const SideBar = () => {
    return (
        <div className="sidebar">
            <Snavbar />
            <SearchBar />
            <Chats />
        </div>
    );
}

export default SideBar;