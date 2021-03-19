import { categoryConstants } from "../actions/constants";

const initState = {
    categories: [],
    error: null,
    message: '',
    loading: false
}

const updateCategoryList = (categories, newCategory) => {
    const categoryArr = [];
    if(newCategory.parent === undefined){
        return [...categories, {
            _id:newCategory._id,
            name:newCategory.name,
            slug:newCategory.slug,
            children:[]
        }];        
    }
    for( let category of categories){
        if(category._id === newCategory.parent){
            categoryArr.push({
                ... category,
                children:category.children ? updateCategoryList([...category.children, {
                    _id:newCategory._id,
                    name:newCategory.name,
                    slug:newCategory.slug,
                    parent:newCategory.parent,
                    children:newCategory.children
                }], newCategory) : []
            });
        } else{
            categoryArr.push({
                ...category,
                children:category.children ? updateCategoryList(category.children, newCategory) : []
            });
        }
    }
    return categoryArr;
}


export default (state = initState, action) => {
    switch (action.type) {
        case categoryConstants.GET_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories
            }
            break;
        case categoryConstants.ADD_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;    
        case categoryConstants.ADD_CATEGORY_SUCCESS:
            const newCategory = action.payload.category;
            const updatedCategoryList = updateCategoryList(state.categories, newCategory);
            console.log(updatedCategoryList);
            state = {
                ...state,
                categories: updatedCategoryList,
                loading: false
            }
            break;
        case categoryConstants.ADD_CATEGORY_FAILURE:
            state = {
                ...initState
            }
            break;
        default:
            break;
    }
    return state;
}