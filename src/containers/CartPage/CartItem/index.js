import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { removeCartItem } from '../../../actions/cart.action';

import './style.css';

const CartItem = (props) => {
    const [qty, setQty] = useState(props.cartItems.quantity);
    const { _id, name, price } = props.cartItems;
    const dispatch = useDispatch();
    let img = undefined;
    if(props.cartItems.productPics){
        img = props.cartItems.productPics[0].img;
    }else if (props.cartItems.img){
        img = props.cartItems.img;
    }

    const increaseQty = () =>{
        setQty(qty + 1);
        props.onIncreaseQty(_id, qty + 1);
    }

    const decreaseQty = () =>{
        if(qty <= 1) return;
        setQty(qty - 1);
        props.onDecreaseQty(_id, qty - 1);
    }

    const onRemoveItem = (productId) => {
        const payload = {
            productId
        }
        dispatch(removeCartItem(payload));
    }

    return (
        <div className="cartItemContainer">
            
            <div  className="flexRow">
                <div className="cartProImgContainer">
                    <img src={img} />
                </div>
                <div className="cartItemDetails">
                    <div>
                        <p>{name}</p>
                        <p>Rs.{price}</p>
                    </div>
                    <div>Delivery 3-5 day</div>
                </div>
            </div>
            <div>
                <div className="quantityControl">
                    <button onClick={decreaseQty}>-</button>
                    <input value={qty} readOnly />
                    <button onClick={increaseQty}>+</button>
                </div>
                <button className="cartActionBtn">Save for later</button>
                <button className="cartActionBtn" onClick={() => onRemoveItem(_id)}>Remove</button>
            </div>
        </div>
    )
}

export default CartItem
