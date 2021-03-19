import { cartConstants } from "./constants"
import store from '../store';
import axiosInstance from "../helpers/axios";

const getCartItems = () => {
   return async dispatch => {
       try {
           dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
           const res = await axiosInstance.get(`/user/getCartItems`);

           if (res.status === 200) {
               const { cartItems } = res.data;
               console.log('cart items',{ getCartItems: cartItems });
               dispatch({
                   type: cartConstants.ADD_TO_CART_SUCCESS,
                   payload: {
                       cartItems
                   }
               })
           }
       } catch(error) {
           console.log(error);
       }

   } 
}

export const addToCart = (product, newQty = 1) => {
    return async dispatch => {
        const {
            cart:{
                cartItems
            },
            auth
        } = store.getState();
        const quantity = cartItems[product._id] ? parseInt(cartItems[product._id].quantity + newQty) : 1;
        cartItems[product._id] = {
            ...product,
            quantity
        }
        console.log('cart item::add to cart', cartItems[product._id])
        

        if(auth.authenticated){
            dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
            const payload = {
                cartItems:[{
                    product:product._id,
                    quantity
                }]
            }
            console.log('pay load in add to cart',payload)
            const res = await axiosInstance.post(`/user/cart/addToCart`, payload);
            console.log('res in add to cart',res);
            if(res.status === 201){
                dispatch(getCartItems());
            }
        }else{
            localStorage.setItem('cart',JSON.stringify(cartItems));
        }

        console.log('addToCart::cartItems',cartItems);

        dispatch({
            type: cartConstants.ADD_TO_CART_SUCCESS,
            payload:{
                cartItems
            }
        })
    }
}

export const updateCart = () => {
    return async dispatch => {
        const { auth } = store.getState();
        const cartItems = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : null;

        if(auth.authenticated){
            localStorage.removeItem('cart');
            if(cartItems){
                const payload = {
                    cartItems: Object.keys(cartItems).map((key,index) => ({
                        product: cartItems[key]._id,
                        quantity: cartItems[key].quantity
                    }))
                }
                const res = await axiosInstance.post(`/user/cart/addToCart`, payload);
                if(res.status === 201){
                    dispatch(getCartItems());
                }
            }
            
        } else {
            if (cartItems) {
                dispatch({
                    type: cartConstants.ADD_TO_CART_SUCCESS,
                    payload: {cartItems}
                })
            }
        }
        
    }

}

export const removeCartItem = (payload) => {
    return async dispatch => {
        try {
            dispatch({ type: cartConstants.REMOVE_CART_ITEM_REQUEST });
            const res = await axiosInstance.post(`/user/cart/removeItem`, {payload});
 
            if (res.status === 202) {
                dispatch({
                    type: cartConstants.REMOVE_CART_ITEM_SUCCESS,
                    
                });
                dispatch(getCartItems());
            } else {
                dispatch({
                    type:cartConstants.REMOVE_CART_ITEM_FAILURE,
                    error:res.data.error
                })
            }
        } catch(error) {
            console.log(error);
        }
 
    }     
}

export {
    getCartItems
}