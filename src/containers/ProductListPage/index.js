import React from 'react'

import Layout from '../../components/Layout'
import getParams from '../../utils/getParams'
import ProductPage from './ProductPage'
import ProductStore from './ProductStore'
import ClothingAndAccessories from './ClothingAndAccessories'

import './style.css'

const ProductListPage = (props) => {
    const renderProduct = () => {
        
        
        const params = getParams(props.location.search);
        let content = null;
        if(params){
            switch (params.type) {
                case 'store':
                    content = <ProductStore {...props}/>
                    break;
                
                case 'page':
                    content = <ProductPage {...props} />
                    break;
                default:
                    content = <ClothingAndAccessories {...props} />
            }
            return content;
        }
        
    }


    return (
        <Layout>
            {renderProduct()}
        </Layout>
    )
}

export default ProductListPage
