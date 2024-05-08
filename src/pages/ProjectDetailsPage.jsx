import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { API_URL } from "../utils/constants"


function ProjectDetailsPage() {

    const [project, setProject] = useState(null);

    const { projectId } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        getProject();
    }, []);


    const getProject = () => {
        axios
            .get(`${API_URL}/projects/${projectId}?_embed=tasks`)
            .then((response) => {
                setProject(response.data);
            })
            .catch(e => console.log("error getting project details from API", e))
    };


    const deleteProject = () => {
        axios
            .delete(`${API_URL}/projects/${projectId}`)
            .then(() => {
                navigate("/projects");
            })
            .catch(e => console.log("error deleting project", e))
    };  



    if (project === null) {
        return <div className="loader"></div>;
    }

    return (
        <div className="ProjectDetailsPage">

            {project && (
                <>
                    <h1>{project.title}</h1>
                    <p>{project.description}</p>
                </>
            )}

            {project &&
                project.tasks.map((task) => (
                    <li className="TaskCard card" key={task.id}>
                        <h3>{task.title}</h3>
                        <h4>Description:</h4>
                        <p>{task.description}</p>
                    </li>
                ))}


            <div className="controls">
                <Link to={`/projects/edit/${projectId}`}>
                    <button>Edit</button>
                </Link>

                <button onClick={deleteProject}>Delete</button>
            </div>

            

            <Link to="/projects">
                <button>Back to projects</button>
            </Link>

        </div>
    );
}

export default ProjectDetailsPage;
