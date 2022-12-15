import { useState, useContext } from "react";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { searchContext } from "../context/searchcontext";
import { userContext } from "../context/usercred";
import { db } from "../firebase";

const SearchBar = () => {
    const [searchValue, setsearchValue] = useState('');
    const searchcontext = useContext(searchContext)
    const usercontext = useContext(userContext)
    const li = []

    const handleSearch = async () => {
        const q = query(collection(db, 'users'), where('displayName', '==', searchValue));

        const querysnapshot = await getDocs(q);
        querysnapshot.forEach((doc) => {
            if (doc.id !== usercontext.userId) {
                li.push(doc.data())
            }
        })
        searchcontext.setSearchUser(li)
    }

    const handleKey = e => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            handleSearch();
        }
    }

    return (
        <div className="searchbarcontainer">
            <input type="text" className="searchbar" placeholder="Search User by name"
                onChange={(e) => setsearchValue(e.currentTarget.value)} onKeyDown={handleKey} />
        </div>
    );
}

export default SearchBar;