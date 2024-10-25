import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { deleteUser } from "./userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardCheck,
  faClipboardList,
  faPencil,
  faSeedling,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const UserList = () => {
  const [filterState, setFilterState] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const users = useSelector((store) => store.users);

  const handleRemoveUser = (id) => {
    dispatch(deleteUser({ id }));
  };

  const renderCard = (filteredUsers) =>
    filteredUsers.map((user) => (
      <div
        className="flex items-center justify-between bg-[#f4f2ff] rounded-md p-5 mt-2"
        key={user.id}
      >
        <div>
          <img
            src={user.image}
            alt={user.title}
            className="w-[400px] h-[150px] object-cover"
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
    ));

  // Filter users by state, priority, and search query
  const filteredUsers = users.filter((user) => {
    const stateMatch = filterState === "all" || user.state === filterState;
    const priorityMatch =
      filterPriority === "all" || user.priority === filterPriority;
    const nameMatch = user.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return stateMatch && priorityMatch && nameMatch;
  });

  const getUsersByState = (state) =>
    filteredUsers.filter((user) => user.state === state);

  return (
    <div className="container w-[90%] flex flex-col justify-center">
      <div className="flex mb-5 gap-4">
        <label htmlFor="search-query" className="font-bold text-lg">
          Search by Name:
        </label>
        <input
          type="text"
          id="search-query"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter name"
          className="mb-2 px-2 py-1 border rounded"
        />

        <label htmlFor="state-filter" className="font-bold text-lg">
          Filter by State:
        </label>
        <select
          id="state-filter"
          onChange={(e) => setFilterState(e.target.value)}
          className="mb-2"
        >
          <option value="all">All States</option>
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>

        <label htmlFor="priority-filter" className="font-bold text-lg">
          Filter by Priority:
        </label>
        <select
          id="priority-filter"
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="py-16 flex justify-center items-start gap-5">
        <div className="bg-[#d5ccff] min-h-40 rounded-md p-5 w-full text-[#301d8b]">
          <FontAwesomeIcon
            icon={faClipboardList}
            className="mr-2 text-[25px]"
          />
          To-Do
          <div className="list text-[25px]">
            {getUsersByState("todo").length ? (
              renderCard(getUsersByState("todo"))
            ) : (
              <p className="text-center col-span-2 text-gray-700 font-medium mt-9">
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
            {getUsersByState("doing").length ? (
              renderCard(getUsersByState("doing"))
            ) : (
              <p className="text-center col-span-2 text-gray-700 font-medium mt-9">
                No Tasks
              </p>
            )}
          </div>
        </div>

        <div className="bg-[#d5ccff] min-h-40 rounded-md p-5 w-full text-[#301d8b]">
          <FontAwesomeIcon
            icon={faClipboardCheck}
            className="mr-2 text-[25px]"
          />
          Done
          <div className="list text-[25px]">
            {getUsersByState("done").length ? (
              renderCard(getUsersByState("done"))
            ) : (
              <p className="text-center col-span-2 text-gray-700 font-medium mt-9">
                No Tasks
              </p>
            )}
          </div>
        </div>
      </div>
      <Link to="/add-user" className="">
        <Button>Add User</Button>
      </Link>
    </div>
  );
};

export default UserList;
