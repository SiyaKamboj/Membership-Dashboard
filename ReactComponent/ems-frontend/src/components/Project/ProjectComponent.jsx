import React, { useState, useEffect } from 'react'
import { createProject, getAllProjectTypes, getProject, updateProject, getAllMembersAndRolesOfAProject, updateAllMembersAndRolesOfAProject } from '../../services/ProjectService'
//needed to navigate user from one site to another
import { useNavigate, useParams } from 'react-router-dom'
import { listEmployees } from '../../services/EmployeeService';
import { getAllOnsetRoles } from '../../services/ProjectEmployeeService'

const ProjectComponent = () => {
    //setFirstName is function name we use to update first name . firstName is variable
    const [title, setTitle] = useState('');
    const [projectType, setProjectType] = useState('');
    const [description, setDescription] = useState('');
    const [projectTypeEnum, setProjectTypesEnum] = useState([]);
    const [members, setMembers] = useState([]);
    const [filmPositions, setFilmPositions] = useState([]);
    const [projectMembers, setProjectMembers] = useState([{ role: '', memberId: '' }]); // Rows for members

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
                getAllMembersAndRolesOfAProject(id).then(response => {
                    setProjectMembers(response.data);
                }).catch(error => {
                    console.error('There was an error fetching the project roles!', error);
                });
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

    useEffect(() => {
        // Fetch all members
        listEmployees().then((response) => {
            setMembers(response.data);
        }).catch(error => console.error(error));
    }, []);

    useEffect(() => {
        // Fetch all members
        getAllOnsetRoles().then((response) => {
            setFilmPositions(response.data);
        }).catch(error => console.error(error));
    }, []);


    const handleSubmit = (projectId) => {
        //const projectId = id; // Assuming `id` is your current project ID
        // Map frontend data to backend format
        const backendData = projectMembers.map((projectMember) => ({
            member: { id: projectMember.memberid },
            project: { id: projectId },
            role: projectMember.role
        }));

        // Call the backend to update project members
        updateAllMembersAndRolesOfAProject(projectId, backendData).then(() => {
            console.log('Project members updated successfully!');
            //navigator('/projects/view-project/'+id);
        }).catch(error => {
            console.log(backendData);
            console.error('Error updating project members:', error);
        });
    };

    //should support both addand update employee methods
    function saveOrUpdateProject(e){
        //prevent default activities that happen when submitting form
        e.preventDefault();
        var error=false;
        let projectId = id;
        //var projectId;

        if (validateForm()){
            const project={title, projectType, description}
            //console.log(project)

            if(id){
                //old employee so update it
                updateProject(id, project).then((response) => {
                    console.log(response.data);
                    handleSubmit(id);
                    //call command to delete all old instances of the project
                        //call command to add in the new instances
                    navigator('/projects');
                }).catch(error =>{
                    error=true;
                    console.error(error);
                })
            }
            else{
                //now actually save into sql database because new employee
                createProject(project).then(response => {
                    console.log(response.data);
                    //console.log("This is newly created id: "+ response.data.id);
                    //projectId=response.data.id;
                    projectId = response.data.id;
                    handleSubmit(projectId);
                    //call command to add in the new instances
                    //navigate to list all employees page
                    navigator('/projects');
                }).catch(error =>{
                    error=true;
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

    const handleAddRow = () => {
        setProjectMembers([...projectMembers, { role: '', memberid: '' }]);
        //setProjectMembers([...projectMembers, { role: '', memberId: '' }]);
        //setProjectMembers([...projectMembers, { role: '', firstname: '' }]);
    };

    const handleRemoveRow = (index) => {
        const rows = [...projectMembers];
        rows.splice(index, 1);
        setProjectMembers(rows);
    };

    const handleRoleChange = (index, value) => {
        const rows = [...projectMembers];
        rows[index].role = value;
        setProjectMembers(rows);
    };

    const handleMemberChange = (index, value) => {
        const rows = [...projectMembers];
        rows[index].memberid = value;
        //rows[index].memberId = value;
        //rows[index].firstName=value;
        setProjectMembers(rows);
    };


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

                        {/*Another table for assigning project members*/}
                        <div className="project-members-table">
                            <h2 className="card-title">Assign Members</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Role</th>
                                        <th>Member</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projectMembers.map((projectMember, index) => (
                                        <tr key={index}>
                                            <td>
                                                <select
                                                    value={projectMember.role}
                                                    onChange={(e) => handleRoleChange(index, e.target.value)}
                                                >
                                                    <option value="">Select role</option>
                                                    {filmPositions.map((currRole) => (
                                                        <option key={currRole} value={currRole}>
                                                            {currRole}
                                                        </option>
                                                    ))}
                                                    {/* Add other roles here */}
                                                </select>
                                            </td>
                                            <td>
                                                <select
                                                    //value={projectMember.memberId}
                                                    //value={projectMember.firstname}
                                                    value={projectMember.memberid}
                                                    onChange={(e) => handleMemberChange(index, e.target.value)}
                                                >
                                                    <option value="">Select member</option>
                                                    {members.map(member => (
                                                        <option key={member.id} value={member.id}>
                                                            {member.firstName + ' '+ member.lastName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td>
                                                <button type="button" onClick={() => handleRemoveRow(index)}>Remove</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button type="button" onClick={handleAddRow}>Add Member</button>
                            {/*<button type="button" onClick={handleSubmit}>Submit Changes</button>*/}
                        </div>


                        <br/>
                        <button className='btn btn-success' onClick={saveOrUpdateProject} style={{marginBottom: '70px'}}> Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProjectComponent