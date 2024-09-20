import React, {useEffect, useState} from 'react'
import { listProjects, getAllProjectTypes, deleteProject } from '../../services/ProjectService'
import {useNavigate} from 'react-router-dom'

const ListProjectComponent = () => {
    const [projects, setProjects]=useState([])
    const [filterProject, setFilterProject] = useState(''); // State for the selected filter position
    const [projectTypeEnum, setProjectTypeEnum] = useState([]); // State to hold the positions retrieved from the backend
    const navigator = useNavigate();

    // Fetch positions dynamically from the backend
    useEffect(() => {
        getAllProjectTypes().then(response => {
            setProjectTypeEnum(response.data); // Set positions from backend
        }).catch(error => {
            console.error('Error fetching positions:', error);
        });
    }, []);

    useEffect(() => {
        getAllProjects();
    }, [])

    function getAllProjects(){
        listProjects().then((response) => {
            setProjects(response.data); 
         }).catch(error => {
             console.error(error);
         })
    }

    function addNewProject(){
        navigator('/add-project');

    }

    function updateProject(id){
        navigator(`/edit-project/${id}`);
    }

    function viewProject(id){
        navigator(`view-project/${id}`);
    }

    function removeProject(id){
        console.log(id);

        deleteProject(id).then((response) =>{
            getAllProjects();

        }).catch(error => {
            console.error(error);
        })
    }


    const filteredProjects = filterProject
        ? projects.filter(project => project.projectType === filterProject)
        : projects;

  return (
    <div className='container'>
        <h2 style={{marginTop: '15px'}}className='text-center'>List of TTV Projects</h2>

        <br /> 
        
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="form-group">
                    <label>Filter by Project Type:</label>
                    <select
                        className="form-control"
                        value={filterProject}
                        onChange={(e) => setFilterProject(e.target.value)}
                    >
                        <option value="">All</option> 
                        {projectTypeEnum.map(currproject => (
                            <option key={currproject} value={currproject}>
                                {currproject}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
            
        <br /> 

        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    
                    <th>Project Name</th>
                    <th>Project Type</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    //iterate over array and display each one in new row
                    filteredProjects
                    //employees
                    //.filter(employee => employee.position === 'CFO') 
                    .map(project =>
                        <tr key={project.id}>
                            
                            <td>{project.title}</td>
                            <td>{project.projectType}</td>
                       
                            <td>
                                <button className='btn btn-info' onClick={() => updateProject(project.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeProject(project.id)}
                                style={{marginLeft: '10px'}}>Delete</button>
                                <button type="button" className="btn btn-dark" onClick={() => viewProject(project.id)} style={{marginLeft: '10px'}}>View</button>
                            </td>
                        </tr>
                    )
                }
                
            </tbody>
        </table>
        <button className='btn btn-primary' onClick={addNewProject} style={{marginBottom: '70px'}}> Add Project</button>
    </div>
  )
}

export default ListProjectComponent
