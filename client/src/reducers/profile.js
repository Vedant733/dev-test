import { GET_ALL_PROFILES, GET_PROFILE, PROFILE_ERROR, SET_PROFILE } from "../actions/types"
const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    error: {}
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE:
        case SET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false,
                error: null
            }
        case GET_ALL_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                error: null,
                loading: false,
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}