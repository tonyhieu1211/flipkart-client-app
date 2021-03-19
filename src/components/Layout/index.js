import React from 'react'
import Header from '../header'
import MenuHeader from '../MenuHeader'

const Layout = (props) => {
    return (
        <div>
            <Header></Header>
            <MenuHeader></MenuHeader>
            {props.children}
        </div>
        
    )
}

export default Layout
