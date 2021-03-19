import { userConstants } from "../actions/constants";

const initState = {
    address:[],
    orders:[],
    orderDetails:[],
    error:null,
    loading:false
}

export default (state = initState, action) => {
    switch (action.type) {
        case userConstants.GET_USER_ADDRESS_REQUEST:
            state = {
                ...state,
                loading:true
            }
            break;
        
        case userConstants.GET_USER_ADDRESS_SUCCESS:
            state = {
                ...state,
                address:action.payload.address,
                loading:false
            }
            break;
    
        case userConstants.GET_USER_ADDRESS_FAILURE:
            state = {
                ...state,
                error:action.payload.error,
                loading:false
            }
            break;
        case userConstants.ADD_USER_ADDRESS_REQUEST:
            state = {
                ...state,
                loading:true
            }
            break;
        
        case userConstants.ADD_USER_ADDRESS_SUCCESS:
            state = {
                ...state,
                address:action.payload.address,
                loading:false
            }
            break;
    
        case userConstants.ADD_USER_ADDRESS_FAILURE:
            state = {
                ...state,
                error:action.payload.error,
                loading:false
            }
            break;
        case userConstants.GET_USER_ORDER_REQUEST:
            state = {
                ...state,
                loading:true
            }
            break;
        
        case userConstants.GET_USER_ORDER_SUCCESS:
            state = {
                ...state,
                orders:action.payload.orders,
                loading:false
            }
            break;
    
        case userConstants.GET_USER_ORDER_FAILURE:
            state = {
                ...state,
                error:action.payload.error,
                loading:false
            }
            break;
        case userConstants.GET_USER_ORDER_DETAIL_REQUEST:
            
            break;
        
        case userConstants.GET_USER_ORDER_DETAIL_SUCCESS:
            state = {
                ...state,
                orderDetails:action.payload.order,
                loading:false
            }
            break;
    
        case userConstants.GET_USER_ORDER_DETAIL_FAILURE:
            
            break;
        default:
            break;
    }
    return state;
}