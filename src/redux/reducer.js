//initial state
const initialState = {
    username: '',
    profilePic: ''
}

//action types
const UPDATE_USER = "UPDATE_USER";
const LOGOUT_USER = "LOGOUT_USER";

//action builders
export function updateUser(param){
    return{
        type: UPDATE_USER,
        payload: {
            username: param.username,
            profilePic: param.profile_pic
        }
    }
}

export function logout(){
    return{
        type: LOGOUT_USER,
        payload: null
    }
}

//reducer
export default function reducer(state=initialState,action){
    switch(action.type){
        case UPDATE_USER:
            return {...state,username: action.payload.username,profilePic: action.payload.profilePic}
        case LOGOUT_USER:
            return {...state,username: action.payload,profilePic: action.payload}
        default:
            return {...state}
    }
}