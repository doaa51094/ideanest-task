import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Button from './../components/Button';
import TextField from "./../components/TextField"
import { editUser } from "./userSlice"

const EditUser = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const users = useSelector(store => store.users);
  const navigate = useNavigate();
  const existingUser = users.filter(user => user.id === params.id);
  const { image,title,description,priority,state } = existingUser[0];
  const [values, setValues] = useState({
    image,title,description,priority,state 
  });

  const handleEditUser = () => {
    setValues({image:'',title:'',description:'',priority:'',state:'' });
    dispatch(editUser({
      id: params.id,
      image: values.image,
      title: values.title,
      description: values.description,
      priority: values.priority,
      state: values.state,
    }));
    navigate('/');
  }

  return (
    <div className="mt-10 max-w-xl mx-auto">
      <TextField
        label="title"
        value={values.title}
        onChange={(e) => setValues({ ...values, title: e.target.value })}
        inputProps={{ type: 'text', placeholder: 'Jhon Doe' }}
      />
      <br />
      <TextField
        label="description"
        value={values.description}
        onChange={(e) => setValues({ ...values, description: e.target.value })}
        inputProps={{ type: 'text', placeholder: 'description' }}
      />
      <Button onClick={handleEditUser}>Edit</Button>
    </div>
  )
}

export default EditUser