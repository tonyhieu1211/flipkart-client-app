import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategories } from '../../actions/category.action';
import './style.css'

const MenuHeader = () => {
  
    const categoryReducer = useSelector(state => state.category);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getCategories());
    },[])

    const renderCategories = (categories) => {
        let categoryArr = [];
        for(let category of categories){
            categoryArr.push(
                <li key={category.name}> 
                    
                    {category.parent === "undefined" || category.parent === undefined  ?
                        <span>{category.name}</span> 
                        : <Link to={`${category.slug}?categoryId=${category._id}&type=${category.type}`}>{category.name}</Link>
                    } 
                    {category.children.length > 0 ? 
                        (<ul>{renderCategories(category.children)}</ul>):
                        null    
                    }
                </li>
                
            );
        }
        return categoryArr;
    }    
    
    return (
        <div className="menuHeader">
            <ul>
                {categoryReducer.categories ? renderCategories(categoryReducer.categories) : null}
            </ul> 
        </div>
    )
}

export default MenuHeader
