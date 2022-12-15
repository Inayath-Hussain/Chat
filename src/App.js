import { Routes, Route, Navigate } from "react-router-dom";
import Main from './components/main';
import LogIn from './components/login';
import ProtectedRoute from "./components/protectedroute";
import { UserContextProvider } from '../src/context/usercred'
import { SearchContextProvider } from "./context/searchcontext";
import { ChatContextProvider } from "./context/chatcontext";
import ModalContextProvider from './context/modalcontext'
import './App.css';


function App() {
  return (
    <UserContextProvider>
      <ChatContextProvider>
        <ModalContextProvider>
          <SearchContextProvider>
            <Routes>
              <Route path="/" />
              <Route index element={<ProtectedRoute><Main /></ProtectedRoute>} />
              <Route path='login' element={localStorage.getItem('Allow') ? <Navigate to='/' /> : <LogIn />} />
            </Routes>
          </SearchContextProvider>
        </ModalContextProvider>
      </ChatContextProvider>
    </UserContextProvider>
  );
}

export default App;
