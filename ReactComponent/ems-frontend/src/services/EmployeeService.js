import axios from "axios";

//this is the connection to the link for the springboot app. Each of these links must correspond to a mapping in the springboot/java application
const REST_API_BASE_URL = 'http://localhost:8080/api/employees';

export const listEmployees = () => axios.get(REST_API_BASE_URL);

export const createEmployee = (employee) => axios.post(REST_API_BASE_URL, employee);

export const getEmployee = (employeeId) => axios.get(REST_API_BASE_URL + "/" + employeeId);

export const updateEmployee= (employeeId, employee) => axios.put(REST_API_BASE_URL + '/'+employeeId, employee)

export const deleteEmployee= (employeeId) => axios.delete(REST_API_BASE_URL+ "/" + employeeId);

export const getAllPositions= () => axios.get('http://localhost:8080/api/positions');

export const updatePositions= (currentPosition, newPosition) => axios.put(REST_API_BASE_URL+"/update-positions?currentPosition=" + currentPosition + "&newPosition=" + newPosition);


