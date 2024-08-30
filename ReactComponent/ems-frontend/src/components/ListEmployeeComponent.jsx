import React, {useEffect, useState} from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import {useNavigate} from 'react-router-dom'

const ListEmployeeComponent = () => {
    const [employees, setEmployees]=useState([])
    const navigator = useNavigate();
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

  return (
    <div className='container'>
        <h2 style={{marginTop: '15px'}}className='text-center'>List of Employees</h2>
        <button className='btn btn-primary' onClick={addNewEmployee} style={{marginBottom: '15px'}}> Add Employee</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    //iterate over array and display each one in new row
                    employees.map(employee =>
                        <tr key={employee.id}>
                            
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                       
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
    </div>
  )
}

export default ListEmployeeComponent
