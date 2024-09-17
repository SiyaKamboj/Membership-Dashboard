import React, {useEffect, useState} from 'react'
import { deleteEmployee, getAllPositions,listEmployees } from '../services/EmployeeService'
import {useNavigate} from 'react-router-dom'

const ListEmployeeComponent = () => {
    const [employees, setEmployees]=useState([])
    const [filterPosition, setFilterPosition] = useState(''); // State for the selected filter position
    const [positionsEnum, setPositionsEnum] = useState([]); // State to hold the positions retrieved from the backend

    const navigator = useNavigate();

    // Fetch positions dynamically from the backend
    useEffect(() => {
        getAllPositions().then(response => {
            setPositionsEnum(response.data); // Set positions from backend
        }).catch(error => {
            console.error('Error fetching positions:', error);
        });
    }, []);

    useEffect(() => {
        getAllEmployees();
    }, [])

    function getAllEmployees(){
        listEmployees().then((response) => {
            setEmployees(response.data); 
         }).catch(error => {
             console.error(error);
         })
    }

    function addNewEmployee(){
        navigator('/add-employee');

    }

    function updateEmployee(id){
        navigator(`/edit-employee/${id}`);
    }

    function viewEmployee(id){
        navigator(`view/${id}`);
    }

    function removeEmployee(id){
        console.log(id);

        deleteEmployee(id).then((response) =>{
            getAllEmployees();

        }).catch(error => {
            console.error(error);
        })
    }

    const filteredEmployees = filterPosition
        ? employees.filter(employee => employee.position === filterPosition)
        : employees;

  return (
    <div className='container'>
        <h2 style={{marginTop: '15px'}}className='text-center'>List of Employees</h2>

        <br /> <br />
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {/* Dropdown to select the position filter */}
                    <div className="form-group">
                        <label>Filter by Position:</label>
                        <select
                            className="form-control"
                            value={filterPosition}
                            onChange={(e) => setFilterPosition(e.target.value)}
                        >
                            <option value="">All</option> {/* Option to show all employees */}
                            {positionsEnum.map(currposition => (
                                <option key={currposition} value={currposition}>
                                    {currposition}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        <br /> <br />

        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Position</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    //iterate over array and display each one in new row
                    filteredEmployees
                    //employees
                    //.filter(employee => employee.position === 'CFO') 
                    .map(employee =>
                        <tr key={employee.id}>
                            
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.position}</td>
                       
                            <td>
                                <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}
                                style={{marginLeft: '10px'}}>Delete</button>
                                <button type="button" className="btn btn-dark" onClick={() => viewEmployee(employee.id)} style={{marginLeft: '10px'}}>View</button>
                            </td>
                        </tr>
                    )
                }
                
            </tbody>
        </table>
        <button className='btn btn-primary' onClick={addNewEmployee} style={{marginBottom: '70px'}}> Add Employee</button>
    </div>
  )
}

export default ListEmployeeComponent
