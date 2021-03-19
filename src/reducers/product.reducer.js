import { productConstants } from "../actions/constants";

const initState = {
    products:[],
    priceRange:{},
    productsByPrice: {
        under2000k: [],
        under3000k: [],
        under4000k: [],
        under5000k: [],
        under6000k: [],
        under7000k: [],
    },
    getPageRequest:false,
    page:{},
    error:null,
    productDetails:{},
    loading: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case productConstants.GET_PRODUCT_BY_SLUG_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
                priceRange:action.payload.priceRange,
                productsByPrice:{
                    ...action.payload.productsByPrice
                }
            }
            break;
        
        case productConstants.GET_PRODUCT_PAGE_REQUEST:
            state = {
                ...state,
                getPageRequest:true
            }
            break;
        case productConstants.GET_PRODUCT_PAGE_SUCCESS:
            state = {
                ...state,
                page:action.payload.page,
                getPageRequest:false
            }
            break;
        case productConstants.GET_PRODUCT_PAGE_FAILURE:
            state = {
                ...state,
                getPageRequest:false,
                error:action.payload.error
            }
            
            break;
        case productConstants.GET_PRODUCT_BY_ID_REQUEST:
            state = {
                ...state,
                loading: true
            }
            
            break;
        case productConstants.GET_PRODUCT_BY_ID_SUCCESS:
            state = {
                ...state,
                productDetails:action.payload.productDetails,
                loading: false
            }
            
            break;
        case productConstants.GET_PRODUCT_BY_ID_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            
            break;
        default:
            break;
    }
    return state;
}