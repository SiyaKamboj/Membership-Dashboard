import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProject } from '../../services/ProjectService';
import {useNavigate} from 'react-router-dom'

const ViewProject  = () => {
    //allow us to navigate to a different webpage
    const navigator = useNavigate();

    //first initializes to empty string 
    const [title, setTitle] = useState('');
    const [projectType, setProjectType] = useState('');
    const [description, setDescription] = useState('');

    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        if (id) {
            getProject(id).then((response) => {
                setTitle(response.data.title);
                setProjectType(response.data.projectType);
                setDescription(response.data.description);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    function allProjects(){
        navigator('/projects');

    }

    function updateProject(id){
        navigator(`/edit-project/${id}`);
    }

    return (
        <div className="member-details-container">
            <div className="button-group">
                <button className="btn btn-dark" onClick={allProjects}>See all projects</button>
                <button className="btn btn-info" onClick={() => updateProject(id)}>Update this project</button>
            </div>
            
            <div className="card member-card">
                <h1 className="card-title">Project Details</h1>
                <div className="card-body">
                    <p><strong>Title:</strong> {title}</p>
                    <p><strong>Project Type:</strong> {projectType}</p>
                    <p><strong>Description:</strong> {description}</p>
                </div>
            </div>
        </div>
    );
};

export default ViewProject