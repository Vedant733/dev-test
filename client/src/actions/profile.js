import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR, SET_PROFILE, GET_ALL_PROFILES, GET_PROFILE_BY_ID } from "./types";

export const getCurrentProfile = () => async dispatch => {
    try {
        const profile = await axios.get('/api/profile/me')
        dispatch({
            type: GET_PROFILE,
            payload: profile.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const setCurrentProfile = (profile) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify(profile)
        const pfile = await axios.post('/api/profile', body, config)
        dispatch({
            type: SET_PROFILE,
            payload: pfile.data
        })
        return true
    } catch (err) {
        console.log(err)
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'error')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
    return false
}

export const getAllProfiles = () => async dispatch => {
    try {
        const profiles = await axios.get('/api/profile')
        dispatch({
            type: GET_ALL_PROFILES,
            payload: profiles
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const getProfileById = (userId) => async dispatch => {
    try {
        const profile = await axios.get(`/api/${userId}`)
        return profile;
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}