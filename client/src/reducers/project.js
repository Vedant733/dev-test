import { GET_ALL_PROJECTS, PROJECT_ERROR, SET_PROJECT, GET_ALL_USER_PROJECTS } from "../actions/types";
const initialState = {
    project: null,
    projects: [],
    loading: true,
    error: {}
}
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PROJECT:
            return {
                ...state,
                error: null,
            }
        case GET_ALL_USER_PROJECTS:
            return {
                ...state,
                project: action.project,
                error: null,
                loading: false,
            }
        case GET_ALL_PROJECTS:
            return {
                ...state,
                projects: action.payload,
                error: null,
                loading: false,
            }
        case PROJECT_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state
    }

}