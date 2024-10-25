import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { deleteUser } from "./userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardCheck,
  faClipboardList,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.users);
  console.log(users);
  const handleRemoveUser = (id) => {
    dispatch(deleteUser({ id }));
  };

  const renderCard = () =>
    users.map((user) => (
      <div
        className=" flex items-center justify-between bg-[#f4f2ff] rounded-md p-5 mt-2"
        key={user.id}
      >
        <div>
          <img src={user.image} alt={user.title} className="w-[400px] h-[150px] object-cover"/>
          <h3 className="font-bold text-lg text-gray-700 text-[20px]">{user.title}</h3>
          <p className="font-normal text-gray-600 text-[18px]">{user.description}</p>
          <div className="flex justify-between items-center">
          <p className="font-normal text-gray-600 text-[18px] "> {user.priority}</p>
          <div className="flex gap-4">
          <Link to={`edit-user/${user.id}`}>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </Link>
          <button onClick={() => handleRemoveUser(user.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
          </div>
             
        </div>
   
      </div>
    ));

  return (
    <div className="container p-16 flex justify-center items-start gap-5">
      <div className="bg-[#d5ccff] min-h-40 rounded-md p-5 w-full">
        <FontAwesomeIcon icon={faClipboardList} className="mr-2 text-[25px]" />
        To-Do
        <div className="list  text-[25px]">
        {users?.length ? (
          renderCard()
        ) : (
          <p className="text-center col-span-2 text-gray-700 font-semibold">
            No User
          </p>
        )}
        </div>
      </div>
      <div className=" bg-[#d5ccff] min-h-40 rounded-md p-5 w-full">
        <FontAwesomeIcon icon={faSeedling} className="mr-2 text-[25px]" />
        Doing
      </div>
      <div className=" bg-[#d5ccff] min-h-40 rounded-md p-5 w-full">
        <FontAwesomeIcon icon={faClipboardCheck} className="mr-2 text-[25px]" />
        Done
      </div>

      <Link to="/add-user">
        <Button>Add User</Button>
      </Link>
     
    </div>
  );
};

export default UserList;
