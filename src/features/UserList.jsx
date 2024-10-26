import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { deleteUser, editUser } from "./userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardCheck,
  faClipboardList,
  faPencil,
  faSeedling,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import React from "react";
import DropArea from "./../components/DropArea";
const UserList = () => {
  const [filterState, setFilterState] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [ActiveCard, setActiveCard] = useState(null);
  const dispatch = useDispatch();
  const users = useSelector((store) => store.users);
  const handleRemoveUser = (id) => {
    dispatch(deleteUser({ id }));
  };
  const onDrop = (col, index) => {
    console.log(ActiveCard, `going to place ${col} at position ${index}`);
    if (ActiveCard === null) {
      return;
    }
    const taskToMove = users.find((user) => user.id === ActiveCard);
    const updatedTasks = users.filter((user) => user.id !== ActiveCard);

    const state = col === 1 ? "todo" : col === 2 ? "doing" : "done";
    const newUser = { ...taskToMove, column: col, state };
    updatedTasks.splice(index, 0, newUser);

    dispatch(editUser({ updatedTasks }));
    setActiveCard(null);
  };

  const renderCard = (filteredUsers) =>
    filteredUsers.map((user, index) => (
      <React.Fragment key={user.id}>
        <div
          draggable
          onDragStart={() => setActiveCard(user?.id)}
          onDragEnd={() => setActiveCard(null)}
          className="card flex items-center justify-between bg-[#f4f2ff] rounded-md p-5 mt-2"
        >
          <div>
            <img
              src={user.image}
              alt={user.title}
              className="w-[400px] h-[180px] object-cover rounded-md"
            />
            <h3 className="font-bold text-lg text-gray-700 text-[20px]">
              {user.title}
            </h3>
            <p className="font-normal text-gray-600 text-[18px]">
              {user.description}
            </p>
            <div className="flex justify-between items-center">
              <p className="font-normal text-gray-600 text-[18px]">
                {user.priority}
              </p>
              <div className="flex gap-4">
                <Link to={`edit-user/${user.id}`}>
                  <button>
                    <FontAwesomeIcon
                      icon={faPencil}
                      className="text-[20px] text-[#301d8b]"
                    />
                  </button>
                </Link>
                <button onClick={() => handleRemoveUser(user.id)}>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="text-[20px] text-[#301d8b]"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <DropArea onDrop={() => onDrop(user.column, index + 1)} />
      </React.Fragment>
    ));

  const filteredUsers = users.filter((user) => {
    const stateMatch = filterState === "all" || user.state === filterState;
    const priorityMatch =
      filterPriority === "all" || user.priority === filterPriority;
    const nameMatch = user.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    return stateMatch && priorityMatch && nameMatch;
  });

  const getUsersByState = (state) =>
    filteredUsers.filter((user) => user.state === state);

  return (
    <div className="container w-[90%] flex flex-col justify-center py-12">
      <div className="flex justify-between items-center mb-5 gap-4">
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
            className="py-2 px-3 rounded text-[#301d8b] "
            id="state-filter"
            onChange={(e) => setFilterState(e.target.value)}
          >
            <option value="all">All States</option>
            <option value="todo">To Do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>

          <select
            className="py-2 px-3 rounded text-[#301d8b] "
            id="priority-filter"
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className=" flex justify-center items-start gap-5">
        <div className="bg-[#d5ccff] min-h-40 rounded-md p-5 w-full text-[#301d8b]">
          <FontAwesomeIcon
            icon={faClipboardList}
            className="mr-2 text-[25px]"
          />
          To-Do
          <div className="list text-[25px]">
            <DropArea onDrop={() => onDrop(1, 0)} />
            {getUsersByState("todo").length ? (
              <>{renderCard(getUsersByState("todo"))}</>
            ) : (
              <p className="text-center col-span-2 text-gray-700 font-medium text-[18px]">
                No Tasks
              </p>
            )}
          </div>
        </div>

        <div className="bg-[#d5ccff] min-h-40 rounded-md p-5 w-full text-[#301d8b]">
          <FontAwesomeIcon
            icon={faSeedling}
            className="mr-2 text-[25px] text-[#301d8b]"
          />
          Doing
          <div className="list text-[25px]">
            <DropArea onDrop={() => onDrop(2, 0)} />
            {getUsersByState("doing").length ? (
              <>{renderCard(getUsersByState("doing"))}</>
            ) : (
              <p className="text-center col-span-2 text-gray-700 font-medium font-medium text-[18px]">
                No Tasks
              </p>
            )}
          </div>
        </div>
        <div className="w-full flex justify-center items-center flex-col">
          <div className="bg-[#d5ccff] min-h-40 rounded-md p-5 w-full text-[#301d8b]">
            <FontAwesomeIcon
              icon={faClipboardCheck}
              className="mr-2 text-[25px]"
            />
            Done
            <div className="list text-[25px]">
              <DropArea onDrop={() => onDrop(3, 0)} />

              {getUsersByState("done").length ? (
                <>{renderCard(getUsersByState("done"))}</>
              ) : (
                <p className="text-center col-span-2 text-gray-700 font-medium text-[18px]">
                  No Tasks
                </p>
              )}
            </div>
          </div>
          <Link
            to="/add-user"
            className="bg-[#301d8b] text-white font-medium leading-6 text-xl mt-5 px-12 py-3 rounded-md self-end "
          >
            Add Task
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserList;
