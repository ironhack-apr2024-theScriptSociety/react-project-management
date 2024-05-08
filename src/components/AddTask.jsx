import { useState } from "react";
import axios from "axios";

import {API_URL} from '../utils/constants';


function AddTask(props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();

        const currentProjectId = parseInt(props.projectId); // id of the project to which we assign the task
        
        const newTask = {
            title,
            description,
            projectId: currentProjectId
        };

        axios
            .post(`${API_URL}/tasks`, newTask)
            .then((response) => {

                // Reset the state to clear the inputs
                setTitle("");
                setDescription("");

                // Invoke the callback function coming through the props
                // from the ProjectDetailsPage, to refresh the project details
                props.callbackToUpdate()
            })
            .catch(e => console.log("error creating task", e))
    };


    return (
        <div className="AddTask">

            <h3>Add New Task</h3>

            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>

                <label>
                    Description:
                    <textarea
                        type="text"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>

                <button type="submit">Add Task</button>
            </form>
        </div>
    );
}

export default AddTask;
