import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import TextField from "../components/TextField";
import SelectField from "../components/SelectField";
import { editTask } from "./taskSlice";

const EditTask = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const tasks = useSelector((store) => store.tasks);
  const navigate = useNavigate();

  const existingUser = tasks.find((user) => user.id === params.id);

  const [values, setValues] = useState({
    image: existingUser?.image || "",
    title: existingUser?.title || "",
    description: existingUser?.description || "",
    priority: existingUser?.priority || "",
    state: existingUser?.state || "",
  });

  useEffect(() => {
    if (existingUser) {
      setValues({
        image: existingUser.image,
        title: existingUser.title,
        description: existingUser.description,
        priority: existingUser.priority,
        state: existingUser.state,
      });
    }
  }, [existingUser]);

  const handleEditUser = () => {
    dispatch(
      editTask({
        id: params.id,
        ...values,
      })
    );
    navigate("/");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValues((prevValues) => ({ ...prevValues, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-10 bg-[#d5ccff] w-1/3 p-7 rounded-md shadow-md">
      <h2 className="text-center text-[#301d8b] text-[25px] font-medium">
        Edit Task
      </h2>

      <label className="block text-sm font-medium text-gray-700">Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mt-1 border rounded p-2 w-full bg-white"
      />
      {values.image && (
        <img src={values.image} alt="Preview" className="mt-2 w-32 h-32 object-cover" />
      )}

      <TextField
        label="Title"
        value={values.title}
        onChange={(e) => setValues({ ...values, title: e.target.value })}
        inputProps={{ type: "text", placeholder: "Title" }}
      />
      <TextField
        label="Description"
        value={values.description}
        onChange={(e) => setValues({ ...values, description: e.target.value })}
        inputProps={{ type: "text", placeholder: "Description" }}
      />
      <SelectField
        label="Priority"
        value={values.priority}
        onChange={(e) => setValues({ ...values, priority: e.target.value })}
        options={[
          { value: "low", label: "Low" },
          { value: "medium", label: "Medium" },
          { value: "high", label: "High" },
        ]}
      />
      <SelectField
        label="State"
        value={values.state}
        onChange={(e) => setValues({ ...values, state: e.target.value })}
        options={[
          { value: "todo", label: "Todo" },
          { value: "doing", label: "Doing" },
          { value: "done", label: "Done" },
        ]}
      />
      <Button onClick={handleEditUser}>Edit</Button>
    </div>
  );
};

export default EditTask;
