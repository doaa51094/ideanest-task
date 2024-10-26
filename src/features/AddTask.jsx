import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import Button from "../components/Button";
import TextField from "../components/TextField";
import SelectField from "../components/SelectField";
import { addTask } from "./taskSlice";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const AddTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null); 

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    priority: Yup.string().required("Priority is required"),
    state: Yup.string().required("State is required"),
    image: Yup.mixed().required("Image is required"), 
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError, 
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const {  user } = useKindeAuth();

  const onSubmit = (data) => {
    if (!imagePreview) {
      setError("image", { type: "manual", message: "Image is required" }); 
      return; 
    }

    const column = data.state === "todo" ? 1 : data.state === "doing" ? 2 : 3;
    dispatch(
      addTask({
        userId:user?.id,
        id: uuidv4(),
        title: data.title,
        image: imagePreview,
        description: data.description,
        priority: data.priority,
        state: data.state,
        column,
      })
    );
    reset();
    setImagePreview(null);
    navigate("/");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setValue("image", file);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setValue("image", null);
    }
  };

  return (
    <div className="mt-10 bg-[#d5ccff] lg:w-1/3 p-7 rounded-md shadow-md">
      <h2 className="text-center text-[#301d8b] text-[25px] font-medium">
        Create New Task
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label className="block text-sm font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            onChange={handleImageChange}
            className="mt-1 border rounded p-2 w-full bg-white"
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 h-44 object-contain rounded-md"
            />
          )}
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
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        <SelectField
          label="Priority"
          {...register("priority")}
          options={[
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
          ]}
        />
        {errors.priority && (
          <p className="text-red-500">{errors.priority.message}</p>
        )}

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
        <div className="flex justify-center">
          <Button type="submit">Create Task</Button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
