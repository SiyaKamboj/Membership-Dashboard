import axios from "axios";

//this is the connection to the link for the springboot app. Each of these links must correspond to a mapping in the springboot/java application
//const REST_API_BASE_URL = 'http://localhost:8080/api/projects';
const SERVER_URL = 'http://localhost:8080';
export const getAllOnsetRoles= () => axios.get(SERVER_URL+'/api/onset-roles');
