import React, { useState, useEffect } from 'react'
import { createProject, getAllProjectTypes, getProject, updateProject } from '../../services/ProjectService'
//needed to navigate user from one site to another
import { useNavigate, useParams } from 'react-router-dom'

const ProjectComponent = () => {
    //setFirstName is function name we use to update first name . firstName is variable
    const [title, setTitle] = useState('');
    const [projectType, setProjectType] = useState('');
    const [description, setDescription] = useState('');
    const [projectTypeEnum, setProjectTypesEnum] = useState([]);

    const handleTitle = (e) => setTitle(e.target.value);
    const handleDescription = (e) => setDescription(e.target.value);
    
    const {id} = useParams();
    const [errors, setErrors] = useState({
        title: '',
        projectType: '',
        description: '',
    })
    const navigator = useNavigate();

    //ensures that the form is pre-filled when you click update
    //sets firstname statem equal to value that is already in database
    useEffect(() => {
        if (id){
            getProject(id).then((response) => {
                setTitle(response.data.title);
                setProjectType(response.data.projectType);
                setDescription(response.data.description);
            }).catch(error => {
                console.error(error);
            })
        }

    }, [id])

    // Fetch positions from the backend on component mount
    useEffect(() => {
        getAllProjectTypes().then((response) => {
            setProjectTypesEnum(['', ...response.data]);  // Set the fetched positions
        }).catch(error => {
            console.error('Error fetching project types:', error);
        });
    }, []);  // Runs once when the component mounts


    //should support both addand update employee methods
    function saveOrUpdateProject(e){
        //prevent default activities that happen when submitting form
        e.preventDefault();

        if (validateForm()){
            const project={title, projectType, description}
            console.log(project)

            if(id){
                //old employee so update it
                updateProject(id, project).then((response) => {
                    console.log(response.data);
                    navigator('/projects');
                }).catch(error =>{
                    console.error(error);
                })
            }
            else{
                //now actually save into sql database because new employee
                createProject(project).then(response => {
                    console.log(response.data);
                    //navigate to list all employees page
                    navigator('/projects');
                }).catch(error =>{
                    console.error(error);
                })
            }
            

            
        }

        
    }

    function validateForm(){
        let valid = true;
        //copy errors intonew variable called errorsCopy
        const errorsCopy = {... errors}

        if(title.trim()){
            errorsCopy.firstName='';
        }else{
            //this is validation error
            errorsCopy.title='Title is required';
            valid=false;
        }

        if(projectType.trim()){
            //no validation error
            errorsCopy.projectType='';
        }else{
            //this is validation error
            errorsCopy.projectType='Project Type is required';
            valid=false;
        }

        if(description.trim()){
            //no validation error
            errorsCopy.description='';
        }else{
            //this is validation error
            errorsCopy.description='Description is required';
            valid=false;
        }

        setErrors(errorsCopy);
        return valid;


    }

    function pageTitle(){
        if (id){
            return <h2 className='text-center'>Update Project</h2>
        }else{
            return <h2 className='text-center'>Add Project</h2>
        }
    }

  return (
    <div className='container'>
        <br/> <br/>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                <br/>
                {
                    pageTitle()
                }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Title</label>
                            <input
                                type='text'
                                placeholder='Enter Project Title/Name'
                                name='title'
                                value={title}
                                //add multiple css classes using {``}
                                className={`form-control ${ errors.title? 'is-invalid': ''}`}
                                //passing function to onchange property
                                onChange={(handleTitle)}
                            >
                            </input>
                            { /* if there is validation error, it displays here*/ }
                            { errors.title && <div className='invalid-feedback'> { errors.title }</div> }
                        </div>


                        <div className='form-group mb-2'>
                            <label className='form-label'>Description</label>
                            <input
                                type='text'
                                placeholder='Enter Project Description'
                                name='description'
                                value={description}
                                className={`form-control ${ errors.description ? 'is-invalid': ''}`}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                            </input>
                            { errors.description && <div className='invalid-feedback'> { errors.description }</div> }
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Enter Project Type:</label>
                            <select
                            id="projectType"
                            className={`form-control ${ errors.projectType ? 'is-invalid': ''}`}
                            value={projectType}
                            onChange={(e) => setProjectType(e.target.value)}
                            >
                                {projectTypeEnum.map((currprojtype) => (
                                <option key={currprojtype} value={currprojtype}>
                                    {currprojtype}
                                </option>
                            ))}
                            </select>
                            { errors.projectType && <div className='invalid-feedback'> { errors.projectType }</div> }
                        </div>


                        <button className='btn btn-success' onClick={saveOrUpdateProject}> Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProjectComponent