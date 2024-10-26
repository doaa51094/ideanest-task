import { Route, Routes } from "react-router-dom";
import TaskList from './features/TaskList';
import AddTask from './features/AddTask';
import EditTask from './features/EditTask';
import Navbar from './components/NavBar';

function App() {
  return (

   <>
    <Navbar/>
    <div className=" flex justify-center items-center">
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/edit-task/:id" element={<EditTask />} />
      </Routes>
    </div>
   </>

  );
}

export default App;