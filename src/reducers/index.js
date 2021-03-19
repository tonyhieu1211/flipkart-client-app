import { combineReducers } from "redux";
import authReducers from "./auth.reducers";
import cartReducer from "./cart.reducer";
import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";
import userReducer from "./user.reducer";



const rootReducer = combineReducers({

    category: categoryReducer,
    product: productReducer,
    auth: authReducers,
    cart: cartReducer,
    user: userReducer,
});

export default rootReducer;