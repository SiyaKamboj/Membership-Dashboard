import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEmployee , getAllMemberExperience} from '../../services/EmployeeService';
import {useNavigate} from 'react-router-dom'

const ViewEmployee  = () => {
    //allow us to navigate to a different webpage
    const navigator = useNavigate();

    //first initializes to empty string 
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');
    const [major, setMajor] = useState('');
    const [projectRoles, setProjectRoles] = useState([]);

    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        if (id) {
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setPosition(response.data.position);
                setMajor(response.data.major);
                //get all projects and corresponding role
                getAllMemberExperience(id).then(response => {
                    setProjectRoles(response.data);
                }).catch(error => {
                    console.error('There was an error fetching the project roles!', error);
                });
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
        <div className="member-details-container">
            <div className="button-group">
                <button className="btn btn-dark" onClick={allEmployee}>See all members</button>
                <button className="btn btn-info" onClick={() => updateEmployee(id)}>Update this member</button>
            </div>
            
            <div className="card member-card" style={{marginBottom: '70px'}}>
                <h1 className="card-title">Member Details</h1>
                <div className="card-body">
                    <p><strong>First Name:</strong> {firstName}</p>
                    <p><strong>Last Name:</strong> {lastName}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Position:</strong> {position}</p>
                    <p><strong>Major:</strong> {major}</p>
                    <p><strong>Prior Experience:</strong></p>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Project Name</th>
                                <th>Member's Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                //iterate over array and display each one in new row
                                projectRoles.map((projectRole, index) => 
                                    <tr key={index}>
                                        <td>{projectRole.projectName}</td>
                                        <td>{projectRole.role}</td>
                                
                                    </tr>
                                )
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ViewEmployee