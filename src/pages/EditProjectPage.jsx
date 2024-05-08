import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { API_URL } from "../utils/constants";


function EditProjectPage() {

    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);

    const { projectId } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`${API_URL}/projects/${projectId}`)
            .then(response => {
                setTitle(response.data.title)
                setDescription(response.data.description)
            })
            .catch(e => console.log("error getting project details from API", e))
    }, [projectId]);


    const handleSubmit = (e) => {
        e.preventDefault();

        const newDetails = {
            title,
            description
        }

        axios.put(`${API_URL}/projects/${projectId}`, newDetails)
            .then( response => {
                navigate(`/projects/${projectId}`);
            })
            .catch(e => console.log("error updating project", e))
    }


    if (title === null || description === null) {
        return <div className="loader"></div>;
    }


    return (
        <div className="EditProjectPage">

            <h3>Edit Project:</h3>

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
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>

                <button type="submit">Update Project</button>
            </form>
        </div>
    );
}

export default EditProjectPage;
