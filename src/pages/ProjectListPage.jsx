import axios from 'axios'
import { useState, useEffect } from "react";

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


    return (
        <div className='ProjectListPage'>

            <h1>Number of projects: {projects?.length}</h1>

            {projects?.map((project) => {
                return (
                    <div className="ProjectCard card">
                        <h3>{project.title}</h3>
                    </div>
                )
            })}
        </div>
    );
}

export default ProjectListPage;