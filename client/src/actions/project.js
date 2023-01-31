import axios from "axios";
import { setAlert } from "./alert";
import { GET_ALL_PROJECTS, PROJECT_ERROR, SET_PROJECT, GET_ALL_USER_PROJECTS } from "./types";

export const getAllProjects = () => async dispatch => {
    try {
        const projects = await axios.get('/api/project/')
        dispatch({
            type: GET_ALL_PROJECTS,
            payload: projects,
        })
    } catch (err) {
        dispatch({
            type: PROJECT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const getAllUserProjects = (user_id) => async dispatch => {
    try {
        console.log(user_id)
        const projects = await axios.get(`/api/project/${user_id}`)
        dispatch({
            type: GET_ALL_USER_PROJECTS,
            payload: projects,
        })
    }
    catch (err) {
        if ('Not Found' === err.response.statusText) return;
        dispatch({
            type: PROJECT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const setProject = (project) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(project)
    try {
        const proj = await axios.post('/api/project', body, config)
        console.log(proj)
        dispatch({
            type: SET_PROJECT,
        })
    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'error')))
        }
        dispatch({
            type: PROJECT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
        console.log('asdasdasd')
        return false;
    }
    console.log('asdasdasd')
    return true;
}
