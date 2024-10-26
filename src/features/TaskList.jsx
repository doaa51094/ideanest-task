import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTask, updateTask } from "./taskSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardCheck,
  faClipboardList,
  faPencil,
  faSeedling,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import DropArea from "../components/DropArea";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const TaskList = () => {
  const [filterState, setFilterState] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCard, setActiveCard] = useState(null);

  const dispatch = useDispatch();
  const tasks = useSelector((store) => store.tasks);
  const { user } = useKindeAuth();
  const userId = user?.id;
  
  // Filter tasks based on userId
  const userTasks = userId ? tasks.filter((task) => task.userId === userId) : tasks;

  const handleRemoveTask = (id) => dispatch(deleteTask({ id }));

  const onDrop = (col, index) => {
    if (!activeCard) return;
    
    const taskToMove = userTasks.find((task) => task.id === activeCard);
    const updatedTasks = userTasks.filter((task) => task.id !== activeCard);

    const newState = col === 1 ? "todo" : col === 2 ? "doing" : "done";
    const updatedTask = { ...taskToMove, column: col, state: newState };

    updatedTasks.splice(index, 0, updatedTask);
    dispatch(updateTask({ updatedTasks }));
    setActiveCard(null);
  };

  const filteredTasks = userTasks.filter((task) => {
    const stateMatch = filterState === "all" || task.state === filterState;
    const priorityMatch = filterPriority === "all" || task.priority === filterPriority;
    const searchMatch = task.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return stateMatch && priorityMatch && searchMatch;
  });

  const renderTaskCard = (task) => (
    <div
      key={task.id}
      draggable
      onDragStart={() => setActiveCard(task.id)}
      onDragEnd={() => setActiveCard(null)}
      className="card flex items-center justify-between bg-[#f4f2ff] rounded-md p-5 mt-2"
    >
      <div>
        <img src={task.image} alt={task.title} className="w-[400px] h-[180px] object-cover rounded-md" />
        <h3 className="font-bold text-lg text-gray-700 text-[20px]">{task.title}</h3>
        <p className="font-normal text-gray-600 text-[18px]">{task.description}</p>
        <div className="flex justify-between items-center">
          <p
            className={`font-normal text-white text-[18px] px-6 py-1 rounded ${
              task.priority === "low"
                ? "bg-red-500"
                : task.priority === "medium"
                ? "bg-yellow-500"
                : task.priority === "high"
                ? "bg-green-500"
                : "bg-gray-300"
            }`}
          >
            {task.priority}
          </p>
          {userId && (
            <div className="flex gap-4">
              <Link to={`edit-task/${task.id}`}>
                <FontAwesomeIcon icon={faPencil} className="text-[20px] text-[#301d8b]" />
              </Link>
              <button onClick={() => handleRemoveTask(task.id)}>
                <FontAwesomeIcon icon={faTrashCan} className="text-[20px] text-[#301d8b]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderTaskColumn = (tasks, title, icon, dropCol) => (
    <div className="bg-[#d5ccff] min-h-40 rounded-md p-5 w-full text-[#301d8b]">
      <FontAwesomeIcon icon={icon} className="mr-2 text-[25px]" /> {title}
      <div className="list text-[25px]">
        <DropArea onDrop={() => onDrop(dropCol, 0)} />
        {tasks.length ? tasks.map(renderTaskCard) : (
          <p className="text-center col-span-2 text-gray-700 font-medium text-[18px]">No Tasks</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="container w-[90%] flex flex-col justify-center py-12">
      <div className="flex justify-between items-center mb-5 gap-4 flex-col lg:flex-row">
        <input
          type="text"
          id="search-query"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name"
          className="py-2 px-3 rounded text-[#301d8b]"
        />
        <div className="flex gap-4 items-center justify-center">
          <select
            className="py-2 px-3 rounded text-[#301d8b]"
            onChange={(e) => setFilterState(e.target.value)}
          >
            <option value="all">All States</option>
            <option value="todo">To Do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
          <select
            className="py-2 px-3 rounded text-[#301d8b]"
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center items-start gap-5 flex-col lg:flex-row">
        {renderTaskColumn(filteredTasks.filter((task) => task.state === "todo"), "To-Do", faClipboardList, 1)}
        {renderTaskColumn(filteredTasks.filter((task) => task.state === "doing"), "Doing", faSeedling, 2)}
        {renderTaskColumn(filteredTasks.filter((task) => task.state === "done"), "Done", faClipboardCheck, 3)}
      </div>

      <div className="w-full flex justify-center items-center flex-col">
        {userId ? (
          <Link
            to="/add-task"
            className="bg-[#301d8b] text-white font-medium leading-6 text-xl mt-5 px-12 py-3 rounded-md"
          >
            Add Task
          </Link>
        ) : (
          <button
            disabled
            className="bg-gray-400 text-white font-medium leading-6 text-xl mt-5 px-12 py-3 rounded-md cursor-not-allowed"
          >
            Add Task
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskList;
