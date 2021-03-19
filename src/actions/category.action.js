import axios from "../helpers/axios"
import { categoryConstants } from "./constants";

export const getCategories = () => {
    return async dispatch => {
        dispatch({ type: categoryConstants.GET_CATEGORIES_REQUEST });
        const res = await axios.get(`/categories`);
        
        if(res.status === 200){
            const { categoryList } = res.data;

            dispatch({
                type: categoryConstants.GET_CATEGORIES_SUCCESS,
                payload:{
                    categories: categoryList
                }
            });
        } else {
            dispatch({
                type: categoryConstants.GET_CATEGORIES_FAILURE,
                payload:{
                    error: res.data.error
                }
            });
        }
    } 
}


