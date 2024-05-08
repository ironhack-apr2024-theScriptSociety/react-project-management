import axios from 'axios'
import { useState, useEffect } from "react";

function ProjectListPage(){

    const [projects, setProjects] = useState(null);

    const getProjects = () => {
        axios.get("https://project-management-api-4641927fee65.herokuapp.com/projects")
            .then( response => {
                setProjects(response.data);
            })
            .catch( e => console.log("error getting projects from API", e) )
    }

    useEffect(() => {
        getProjects();
    }, []);

    return(
        <>
            <h1>Number of projects: {projects?.length}</h1>

            { projects?.map( (project) => {
                return(
                    <div className="ProjectCard card">
                        <h3>{project.title}</h3>
                    </div>
                )
            }) }
        </>
    );
}

export default ProjectListPage;