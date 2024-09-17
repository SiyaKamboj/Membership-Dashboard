import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEmployee } from '../services/EmployeeService';
import {useNavigate} from 'react-router-dom'

const ViewEmployee  = () => {
    //allow us to navigate to a different webpage
    const navigator = useNavigate();

    //first initializes to empty string 
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');

    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        if (id) {
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setPosition(response.data.position);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    function allEmployee(){
        navigator('/employees');

    }

    function updateEmployee(id){
        navigator(`/edit-employee/${id}`);
    }

    return (
        <div>
            <br/>
            <button className="btn btn-dark" onClick={allEmployee} style={{marginBottom: '15px'}}> See all employees</button>
            <button className='btn btn-info' onClick={() => updateEmployee(id)} style={{marginBottom: '15px', marginLeft: '15px'}}> Update this employee</button>
            <h1>Employee Details</h1>
            <p>Id: {id}</p>
            <p>First Name: {firstName}</p>
            <p>Last Name: {lastName}</p>
            <p>Email: {email}</p>
            <p>Position: {position}</p>
        </div>
    );
};

export default ViewEmployee