import { userConstants } from "./constants"
import axiosInstance from "../helpers/axios";

export const getAddress = () => {
    return async dispatch => {
        try {
            dispatch({ type: userConstants.GET_USER_ADDRESS_REQUEST });
            const res = await axiosInstance.get(`/user/getAddress`);
            if (res.status == 200) {
                const {
                    userAddress: {
                        address
                    }
                } = res.data;
                dispatch({
                    type: userConstants.GET_USER_ADDRESS_SUCCESS,
                    payload: {
                        address
                    }
                })
            } else {
                console.log(res);
                const { error } = res.data;
                dispatch({
                    type: userConstants.GET_USER_ADDRESS_FAILURE,
                    payload: {
                        error
                    }
                })
            }

        } catch (error) {
            console.log(error);
        }

    }
}

export const addAddress = (payload) => {
    return async dispatch => {
        try {
            const res = await axiosInstance.post(`/user/address/create`, { payload });
            dispatch({ type: userConstants.ADD_USER_ADDRESS_REQUEST });
            if (res.status == 201) {
                console.log('add address result', res);
                const {
                    address: { address }
                } = res.data;
                dispatch({
                    type: userConstants.ADD_USER_ADDRESS_SUCCESS,
                    payload: {
                        address
                    }
                })
            } else {
                const { error } = res.data;
                dispatch({
                    type: userConstants.ADD_USER_ADDRESS_FAILURE,
                    payload: {
                        error
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const addOrder = (payload) => {
    return async dispatch => {
        try {
            const res = await axiosInstance.post(`/addOrder`, { payload });
            dispatch({ type: userConstants.ADD_USER_ORDER_REQUEST });
            if (res.status == 201) {
                console.log('add address result', res);
                // const {
                //     address:{address}
                // } = res.data;
                // dispatch({
                //     type: userConstants.ADD_USER_ADDRESS_SUCCESS,
                //     payload:{
                //         address
                //     }
                // })
            } else {
                const { error } = res.data;
                dispatch({
                    type: userConstants.ADD_USER_ORDER_FAILURE,
                    payload: {
                        error
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const getOrders = () => {
    return async dispatch => {
        try {
            dispatch({ type: userConstants.GET_USER_ORDER_REQUEST });
            const res = await axiosInstance.get(`/getOrders`);
            if (res.status == 200) {
                console.log('get orders ', res);
                const {
                    orders
                } = res.data;
                dispatch({
                    type: userConstants.GET_USER_ORDER_SUCCESS,
                    payload: {
                        orders
                    }
                })
            } else {
                console.log(res);
                const { error } = res.data;
                dispatch({
                    type: userConstants.GET_USER_ORDER_FAILURE,
                    payload: {
                        error
                    }
                })
            }

        } catch (error) {
            console.log(error);
        }

    }

    

}

export const getOrder = (payload) => {
    return async dispatch => {
        try {
            dispatch({ type: userConstants.GET_USER_ORDER_DETAIL_REQUEST });
            console.log(payload);
            const res = await axiosInstance.post(`/getOrder`,payload);
            if (res.status == 200) {
                console.log('get orders ', res);
                const {
                    order
                } = res.data;
                dispatch({
                    type: userConstants.GET_USER_ORDER_DETAIL_SUCCESS,
                    payload: {
                        order
                    }
                })
            } else {
                console.log(res);
                const { error } = res.data;
                dispatch({
                    type: userConstants.GET_USER_ORDER_DETAIL_FAILURE,
                    payload: {
                        error
                    }
                })
            }

        } catch (error) {
            console.log(error);
        }

    }

}