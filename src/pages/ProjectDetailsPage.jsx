import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { API_URL } from "../utils/constants"


function ProjectDetailsPage() {

    const [project, setProject] = useState(null);

    const { projectId } = useParams();

    const getProject = () => {
        axios
            .get(`${API_URL}/projects/${projectId}?_embed=tasks`)
            .then((response) => {
                setProject(response.data);
            })
            .catch(e => console.log("error getting project details from API", e))
    };


    useEffect(() => {
        getProject();
    }, []);


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


            <Link to={`/projects/edit/${projectId}`}>
                <button>Edit</button>
            </Link>

            <hr />

            <Link to="/projects">
                <button>Back to projects</button>
            </Link>

        </div>
    );
}

export default ProjectDetailsPage;
