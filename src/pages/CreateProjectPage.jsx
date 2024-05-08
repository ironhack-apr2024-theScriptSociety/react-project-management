import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

import { API_URL } from "../utils/constants";

function CreateProjectPage() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const projectDetails = {
            title,
            description,
        }

        axios.post(`${API_URL}/projects`, projectDetails)
            .then(response => {
                // Once the project is created navigate to the list of projects
                navigate("/projects");
            })
            .catch(e => console.log("error creating new project", e))
    }

    return (
        <div className="CreateProjectPage">

            <h2>Create new project:</h2>

            <form onSubmit={handleSubmit}>

                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter the title"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </label>

                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        placeholder="Enter the description"
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                </label>

                <button>Create</button>
            </form>
        </div>
    )
}

export default CreateProjectPage