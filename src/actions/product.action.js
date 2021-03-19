import axiosInstance from "../helpers/axios"
import { productConstants } from "./constants";

export const getProductsBySlug = (slug) => {
    return async dispatch => {
        const res = await axiosInstance.get(`/products/${slug}`);
        if(res.status === 200){
            dispatch({
                type: productConstants.GET_PRODUCT_BY_SLUG_SUCCESS,
                payload: res.data
            })
        }
    }
}

export const getProductPage = (payload) => {
    return async dispatch => {

        try {
            const { categoryId, type } = payload.param;
            dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST })
            const res = await axiosInstance.get(`/page/${categoryId}/${type}`);

            if (res.status === 200) {
                const { page } = res.data;
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
                    payload: { page }
                })
            } else {
                const { error } = res.data;
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_FAILURE,
                    payload: { error }
                })
            }
        } catch (error) {
            console.log(error);
        }

    }
}

export const getProductById = (payload) => {
    return async dispatch => {
        dispatch({ type: productConstants.GET_PRODUCT_BY_ID_REQUEST });
        const { productId } = payload.params;
        let res;
        try {
            res = await axiosInstance.get(`/product/${productId}`);
            console.log(res);
            dispatch({
                type: productConstants.GET_PRODUCT_BY_ID_SUCCESS,
                payload: {
                    productDetails: res.data.product
                }
            })
        } catch (error) {
            dispatch({
                type: productConstants.GET_PRODUCT_PAGE_FAILURE,
                payload:{
                    error,
                    payload: {errorResponse: res.data.error }
                }
            })
        }
    }

}