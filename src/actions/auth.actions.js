import axios from "../helpers/axios";
import { authConstants, cartConstants } from "./constants";

export const signup = (user) => {
    return async dispatch => {
        try {
            dispatch({ type: authConstants.SIGNUP_REQUEST });
            const res = await axios.post(`/sign-up`, user);
            if(res.status == 201){
                dispatch({ type:authConstants.SIGNUP_SUCCESS });
                const {token, user} = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                dispatch({
                    type:authConstants.LOGIN_SUCCESS,
                    payload:{
                        token,
                        user
                    }
                })
            }else{
                dispatch({type: authConstants.SIGNUP_FAILURE});
            }
        } catch (error) {
            console.log(error);
        }
        
    }
}

export const login = (user) => {
    //dispatch an action
    // dispatch not available=>make available using applyMiddleware(thunk) in store
    
    //console.log(...user);
    return async (dispatch) => {
        dispatch({ type: authConstants.LOGIN_REQUEST });
        const res = await axios.post(`/sign-in`,{
            ...user //why ... user ??
        });

        if(res.status === 200){
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload:{
                    token,
                    user
                }
            });
            
        } else if(res.status === 400){
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}



export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if(token){
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload:{
                    token,
                    user
                }
            });
        } else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: 'failed to login' }
            })
        }
    }
}

export const signOut = () => {
    return async dispatch => {
        dispatch({ type: authConstants.LOGOUT_REQUEST });
        localStorage.clear();
        dispatch({ type: authConstants.LOGOUT_SUCCESS });
        dispatch({ type: cartConstants.RESET_CART});
        // dispatch({ type: authConstants.LOGIN_REQUEST });
        // const res = await axios.post(`/admin/sign-out`);

        // if(res.status === 200){
        //     localStorage.clear();
        //     dispatch({
        //         type: authConstants.LOGOUT_SUCCESS
        //     });
        // } else {
        //     dispatch({
        //         type: authConstants.LOGOUT_FAILURE,
        //         payload: { error: res.data.error }
        //     })
        // }
    }
}