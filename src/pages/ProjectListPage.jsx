import axios from 'axios'
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import { API_URL } from "../utils/constants"

function ProjectListPage() {

    const [projects, setProjects] = useState(null);


    const getProjects = () => {
        axios.get(`${API_URL}/projects`)
            .then(response => {
                const projectsFromApi = response.data.reverse();
                setProjects(projectsFromApi);
            })
            .catch(e => console.log("error getting projects from API", e))
    }


    useEffect(() => {
        getProjects();
    }, []);


    if (projects === null) {
        return <div className="loader"></div>;
    }

    return (
        <div className='ProjectListPage'>

            <h1>Number of projects: {projects?.length}</h1>

            {projects?.map((project) => {
                return (
                    <Link to={`/projects/${project.id}`} key={project.id}>
                        <div className="ProjectCard card">
                            <h3>{project.title}</h3>
                        </div>
                    </Link>
                )
            })}
        </div>
    );
}

export default ProjectListPage;