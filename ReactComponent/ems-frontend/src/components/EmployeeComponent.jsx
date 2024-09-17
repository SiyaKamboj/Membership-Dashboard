import React, { useState, useEffect } from 'react'
import { createEmployee, getAllPositions, getEmployee, updateEmployee } from '../services/EmployeeService'
//needed to navigate user from one site to another
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {
    //setFirstName is function name we use to update first name . firstName is variable
    const [firstName, setFirstName]= useState('')
    const [lastName, setLastName]= useState('')
    const [email, setEmail]= useState('')
    const [position, setPosition]= useState('') //hold position from backedn
    const [positionsEnum, setPositionsEnum] = useState([]);  // Holds the positions fetched from backend

    
    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleLastName = (e) => setLastName(e.target.value);
    

    //const handleemail = (e) => setEmail(e.target.value);
    const {id} = useParams();
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        position: ''
    })
    const navigator = useNavigate();

    //ensures that the form is pre-filled when you click update
    //sets firstname statem equal to value that is already in database
    useEffect(() => {
        if (id){
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setPosition(response.data.position);
            }).catch(error => {
                console.error(error);
            })
        }

    }, [id])

    // Fetch positions from the backend on component mount
    useEffect(() => {
        getAllPositions().then((response) => {
            setPositionsEnum(['', ...response.data]);  // Set the fetched positions
        }).catch(error => {
            console.error('Error fetching positions:', error);
        });
    }, []);  // Runs once when the component mounts

    //should support both addand update employee methods
    function saveOrUpdateEmployee(e){
        //prevent default activities that happen when submitting form
        e.preventDefault();

        if (validateForm()){
            const employee={firstName, lastName, email, position}
            console.log(employee)

            if(id){
                //old employee so update it
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error =>{
                    console.error(error);
                })
            }
            else{
                //now actually save into sql database because new employee
                createEmployee(employee).then(response => {
                    console.log(response.data);
                    //navigate to list all employees page
                    navigator('/employees');
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

        if(firstName.trim()){
            errorsCopy.firstName='';
        }else{
            //this is validation error
            errorsCopy.firstName='First name is required';
            valid=false;
        }

        if(lastName.trim()){
            //no validation error
            errorsCopy.lastName='';
        }else{
            //this is validation error
            errorsCopy.lastName='Last name is required';
            valid=false;
        }

        if(email.trim()){
            //no validation error
            errorsCopy.email='';
        }else{
            //this is validation error
            errorsCopy.email='Email is required';
            valid=false;
        }

        if(position.trim()){
            //no validation error
            errorsCopy.position='';
        }else{
            //this is validation error
            errorsCopy.position='Position is required';
            valid=false;
        }

        setErrors(errorsCopy);
        return valid;


    }

    function pageTitle(){
        if (id){
            return <h2 className='text-center'>Update Employee</h2>
        }else{
            return <h2 className='text-center'>Add Employee</h2>
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
                            <label className='form-label'>First Name</label>
                            <input
                                type='text'
                                placeholder='Enter Employee First Name'
                                name='firstName'
                                value={firstName}
                                //add multiple css classes using {``}
                                className={`form-control ${ errors.firstName? 'is-invalid': ''}`}
                                //passing function to onchange property
                                onChange={(handleFirstName)}
                            >
                            </input>
                            { /* if there is validation error, it displays here*/ }
                            { errors.firstName && <div className='invalid-feedback'> { errors.firstName }</div> }
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name</label>
                            <input
                                type='text'
                                placeholder='Enter Employee Last Name'
                                name='lastName'
                                value={lastName}
                                className={`form-control ${ errors.lastName? 'is-invalid': ''}`}
                                onChange={(handleLastName)}
                            >
                            </input>

                            { errors.lastName && <div className='invalid-feedback'> { errors.lastName }</div> }
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Email</label>
                            <input
                                type='text'
                                placeholder='Enter Employee Email'
                                name='email'
                                value={email}
                                className={`form-control ${ errors.email ? 'is-invalid': ''}`}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </input>
                            { errors.email && <div className='invalid-feedback'> { errors.email }</div> }
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Enter Employee Position:</label>
                            <select
                            id="position"
                            className={`form-control ${ errors.position ? 'is-invalid': ''}`}
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            >
                                {positionsEnum.map((currposition) => (
                                <option key={currposition} value={currposition}>
                                    {currposition}
                                </option>
                            ))}
                            </select>
                            { errors.position && <div className='invalid-feedback'> { errors.position }</div> }
                        </div>

                        <button className='btn btn-success' onClick={saveOrUpdateEmployee}> Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeComponent