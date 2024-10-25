import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./../components/Button";
import TextField from "./../components/TextField";
import SelectField from './../components/SelectField'; // Ensure you import SelectField
import { editUser } from "./userSlice";

const EditUser = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const users = useSelector((store) => store.users);
  const navigate = useNavigate();

  // Find existing user
  const existingUser = users.find((user) => user.id === params.id);
  
  // Initialize state with existing user data
  const [values, setValues] = useState({
    image: existingUser.image || "",
    title: existingUser.title || "",
    description: existingUser.description || "",
    priority: existingUser.priority || "",
    state: existingUser.state || "",
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
      editUser({
        id: params.id,
        ...values, // Spread the updated values
      })
    );
    navigate("/");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValues((prevValues) => ({ ...prevValues, image: reader.result })); // Set the image as a data URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <div className="mt-10 max-w-xl mx-auto">
      <label className="block text-sm font-medium text-gray-700">Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange} // Call handleImageChange on file input change
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      {values.image && <img src={values.image} alt="Preview" className="mt-2 w-32 h-32 object-cover" />} {/* Image preview */}
      
      <TextField
        label="Title"
        value={values.title}
        onChange={(e) => setValues({ ...values, title: e.target.value })}
        inputProps={{ type: "text", placeholder: "John Doe" }}
      />
      <br />
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

export default EditUser;
