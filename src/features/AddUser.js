import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import Button from "./../components/Button";
import TextField from "./../components/TextField";
import SelectField from './../components/SelectField';
import { addUser } from "./userSlice";
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const AddTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  // Define validation schema with Yup
  const validationSchema = Yup.object().shape({
    // image is now handled differently
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    priority: Yup.string().required("Priority is required"),
    state: Yup.string().required("State is required"),
  });

  // Setup React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log("Form submitted successfully", data);
    dispatch(addUser({
      id: uuidv4(),
      title: data.title,
      image: imagePreview, // Use the image preview URL
      description: data.description,
      priority: data.priority,
      state: data.state,
    }));
    reset();
    setImagePreview(null); // Reset image preview
    navigate('/');
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the file
    if (file) {
      const reader = new FileReader(); // Create a FileReader to read the file
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the image preview URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <div className="mt-10 max-w-xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            onChange={handleImageChange} // Handle image change
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.image && <p className="text-red-500">{errors.image.message}</p>}
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover" />} {/* Image preview */}
        </div>

        <TextField
          label="Title"
          {...register("title")}
          inputProps={{ type: "text", placeholder: "Task Title" }}
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <TextField
          label="Description"
          {...register("description")}
          inputProps={{ type: "text", placeholder: "Task Description" }}
        />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}

        <SelectField
          label="Priority"
          {...register("priority")}
          options={[
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
          ]}
        />
        {errors.priority && <p className="text-red-500">{errors.priority.message}</p>}

        <SelectField
          label="State"
          {...register("state")}
          options={[
            { value: "todo", label: "Todo" },
            { value: "doing", label: "Doing" },
            { value: "done", label: "Done" },
          ]}
        />
        {errors.state && <p className="text-red-500">{errors.state.message}</p>}

        <Button type="submit">Create Task</Button>
      </form>
    </div>
  );
};

export default AddTask;
