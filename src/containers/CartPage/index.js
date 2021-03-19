import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getCartItems } from '../../actions/cart.action';
import Layout from '../../components/Layout';
import { MaterialButton } from '../../components/MaterialUI';
import Card from '../../components/UI/Card';
import PriceDetails from '../../components/PriceDetails';
import CartItem from './CartItem';
import './style.css';

const CartPage = (props) => {

    const cartState = useSelector(state => state.cart);
    const authState = useSelector(state => state.auth);
    const [cartItems, setCartItems] = useState({});
    const dispatch = useDispatch();
    useEffect(()=>{
        setCartItems(cartState.cartItems);
    },[cartState.cartItems])
    // const cartItems = cartState.cartItems;

    useEffect(()=>{
        console.log('Cart Page - get cart items...')
        if(authState.authenticated){
            dispatch(getCartItems())
        }
    },[authState.authenticated]);


    const onIncreaseQty = (_id, qty) => {
        const { name, price, img} = cartItems[_id];
        dispatch(addToCart({_id, name, price, img}, 1));
    }
    const onDecreaseQty = (_id, qty) => {
        const { name, price, img} = cartItems[_id];
        dispatch(addToCart({_id, name, price, img}, -1));
    }

    if (props.onlyCartItems) {
        return (
            <>
                {
                    Object.keys(cartItems).map((key, index) =>
                        <CartItem
                            key={index}
                            cartItems={cartItems[key]}
                            onIncreaseQty={onIncreaseQty}
                            onDecreaseQty={onDecreaseQty}
                        />
                    )
                }
            </>
        )
    }

    return (
        <Layout>
            <div className="cartContainer" style={{ alignItems:'flex-start'}}>
                <Card
                    headerLeft={`My Cart`}
                    headerRight={<div>Deliver</div>}
                    style={{width: 'calc(100% - 400px)', overflow:'hidden'}}
                >
                    {
                        Object.keys(cartItems).map((key, index) =>
                            <CartItem 
                                key={index}
                                cartItems={cartItems[key]}
                                onIncreaseQty={onIncreaseQty}
                                onDecreaseQty={onDecreaseQty}
                            />
                        )
                    }

                    <div 
                        style={{
                            width:'100%',
                            display:'flex',
                            background:'#ffffff',
                            justifyContent:'flex-end',
                            boxShadow:'0 0 10px 10px #eee',
                            padding:'10px 0',
                            boxSizing:'border-box'
                        }}
                    >
                        <div style={{width:'250px'}}>
                            <MaterialButton 
                                title="PLACE ORDER"
                                onClick={()=> props.history.push(`checkout`)}
                            />
                        </div>
                    </div>
                    
                </Card>
                <Card
                    headerLeft='Price'
                    style={{
                        width: '380px'
                    }}
                >
                {/* {JSON.stringify(cartState.cartItems)} */}
                <PriceDetails 
                    
                    totalItem = {Object.keys(cartState.cartItems).reduce((totalQty, key) => {
                        return totalQty + cartState.cartItems[key].quantity;
                    },0)}
                    
                    totalPrice = {Object.keys(cartState.cartItems).reduce((totalPrice, key) => {
                        const {quantity,price} = cartState.cartItems[key];
                        return totalPrice + price * quantity

                    },0)}

                />
                </Card>
            </div>
        </Layout>
    )
}

export default CartPage
