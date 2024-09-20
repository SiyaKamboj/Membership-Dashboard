import React, {useEffect, useState} from 'react'
import { deleteEmployee, getAllPositions,listEmployees, updatePositions } from '../../services/EmployeeService'
import {useNavigate} from 'react-router-dom'

const ListEmployeeComponent = () => {
    const [employees, setEmployees]=useState([])
    const [filterPosition, setFilterPosition] = useState(''); // State for the selected filter position
    const [positionsEnum, setPositionsEnum] = useState([]); // State to hold the positions retrieved from the backend
    const [newPosition, setNewPosition] = useState(''); 
    const [isSecondDropdownEnabled, setIsSecondDropdownEnabled] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
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

    // Function to handle first dropdown change
    const handleFirstDropdownChange = (e) => {
        const filterPosition = e.target.value;
        setFilterPosition(filterPosition);

        // Enable the second dropdown and filter employees
        if (filterPosition) {
            setIsSecondDropdownEnabled(true);
            // Can do API call or logic to filter employees based on the selected position, but it is automated already
        } else {
            setIsSecondDropdownEnabled(false);
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        // Validate that both dropdowns have a selection
        if (!filterPosition || !newPosition) {
            alert("Please select both positions.");
            return;
        }

        // Confirmation dialog
        if (window.confirm(`Are you sure you want to change all ${filterPosition} to ${newPosition}?`)) {
            // Call the API to update the positions
            //have not implemented updatePositions yet
            updatePositions(filterPosition, newPosition)
                .then((response) => {
                    setSuccessMessage(`Successfully updated all ${filterPosition} to ${newPosition}. Please refresh the page to get rid of this message`);
                    getAllEmployees();
                })
                .catch(error => {
                    console.error('Error updating positions:', error);
                });
        }
    }

    const filteredEmployees = filterPosition
        ? employees.filter(employee => employee.position === filterPosition)
        : employees;

  return (
    <div className='container'>
        <h2 style={{marginTop: '15px'}}className='text-center'>List of TTV Members</h2>

        <br /> 
        {/* 
            //this is for just filtering data; not mass-changing data
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    //dropdown to select filter
                    <div className="form-group">
                        <label>Filter by Position:</label>
                        <select
                            className="form-control"
                            value={filterPosition}
                            onChange={(e) => setFilterPosition(e.target.value)}
                        >
                            <option value="">All</option> //option to show all employees
                            {positionsEnum.map(currposition => (
                                <option key={currposition} value={currposition}>
                                    {currposition}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            */}
        <div className="form-container">
            <form onSubmit={handleUpdate} className="form-inline">
                <label htmlFor="selectAll">Select all:</label>
                <select id="selectAll"
                    className='inline-dropdown'
                    value={filterPosition}
                    onChange={handleFirstDropdownChange}
                >
                    <option value=''>-- Select Current Position --</option>
                    {positionsEnum.map(position => (
                        <option key={position} value={position}>
                            {position}
                        </option>
                    ))}
                </select>
            
            
                <label htmlFor="changeTo">Change to:</label>
                <select id="changeTo"
                    className='inline-dropdown'
                    value={newPosition}
                    onChange={(e) => setNewPosition(e.target.value)}
                    disabled={!isSecondDropdownEnabled} // Disable until the first dropdown is selected
                >
                    <option value=''>-- Select New Position --</option>
                    {positionsEnum.map(position => (
                        <option key={position} value={position}>
                            {position}
                        </option>
                    ))}
                </select>
            
        

            <button
                type='submit'
                className='inline-button'
                disabled={!isSecondDropdownEnabled} // Disable button until the first dropdown is selected
            >
                Update Positions
            </button>
        </form>
        </div>

    {successMessage && <div className='alert alert-success mt-3'>{successMessage}</div>}
        <br /> 

        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    
                    <th>Name</th>
                    <th>Position</th>
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
                            
                            <td>{employee.firstName + ' '+ employee.lastName}</td>
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
        <button className='btn btn-primary' onClick={addNewEmployee} style={{marginBottom: '70px'}}> Add Member</button>
    </div>
  )
}

export default ListEmployeeComponent
