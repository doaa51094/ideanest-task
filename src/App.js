import { Route, Routes } from "react-router-dom";
import UserList from './features/UserList';
import AddUser from './features/AddUser';
import EditUser from './features/EditUser';

function App() {
  return (
    <div className=" flex justify-center items-center">
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
      </Routes>
    </div>
  );
}

export default App;