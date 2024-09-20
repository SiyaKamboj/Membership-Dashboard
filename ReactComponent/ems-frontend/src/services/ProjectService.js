import axios from "axios";

//this is the connection to the link for the springboot app. Each of these links must correspond to a mapping in the springboot/java application
const REST_API_BASE_URL = 'http://localhost:8080/api/projects';

export const listProjects = () => axios.get(REST_API_BASE_URL);

export const createProject = (project) => axios.post(REST_API_BASE_URL, project);

export const getProject = (projectId) => axios.get(REST_API_BASE_URL + "/" + projectId);

export const updateProject= (projectId, project) => axios.put(REST_API_BASE_URL + '/'+projectId, project)

export const deleteProject= (projectId) => axios.delete(REST_API_BASE_URL+ "/" + projectId);

export const getAllProjectTypes= () => axios.get('http://localhost:8080/api/projecttypes');
