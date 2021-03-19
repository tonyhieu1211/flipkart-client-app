import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrder, getAddress } from '../../actions'
import Layout from '../../components/Layout'
import { MaterialButton, MaterialInput, Anchor } from '../../components/MaterialUI'
import PriceDetails from '../../components/PriceDetails'
import AddressForm from './AddressForm'
import './style.css'
import CartPage from '../CartPage';
import Card from '../../components/UI/Card'

const CheckoutStep = (props) => {
    return (
        <div className="checkoutStep">
            <div onClick={props.onClick} className={`checkoutHeader ${props.active && 'active'}`}>
                <div>
                    <span className="stepNumber">{props.stepNumber}</span>
                    <span className="stepTitle">{props.title}</span>
                </div>
            </div>
            { props.body && props.body}
        </div>
    )
}

const Address = ({
    addr,
    onSelectAddress,
    enableAddressEditForm,
    onConfirmDeliveryAddress,
    onAddressSubmit
}) => {
    return (
        <div className="flexRow addressContainer" >
            <div>
                <input name="address" type="radio" onClick={() => onSelectAddress(addr._id)} />
            </div>
            <div className="flexRow sb addressinfo">
                {
                    addr.edit ?
                        (
                            <AddressForm
                                withoutLayout={true}
                                onSubmitForm={onAddressSubmit}
                                onCancel={() => { }}
                                initialData={addr}
                            />
                        ) :
                        (
                            <div style={{ width: '100%' }}>
                                <div className="addressDetail">
                                    <div>
                                        <span className="addressName">{addr.name}</span>
                                        <span className="addressType">{addr.addressType}</span>
                                        <span className="addressMobileNumber">{addr.mobileNumber}</span>
                                    </div>
                                    {
                                        addr.selected && (
                                            <Anchor
                                                name="EDIT"
                                                onClick={() => enableAddressEditForm(addr._id)}
                                                style={{
                                                    fontWeight: '500',
                                                    color: '#2874f0'
                                                }}
                                            />
                                        )
                                    }
                                </div>
                                <div className="fullAddress">
                                    {addr.address} <br /> {`${addr.state} - ${addr.pinCode}`}
                                </div>
                                    {
                                        addr.selected &&
                                        <MaterialButton
                                            title="DELIVERY HERE"
                                            style={{
                                                width: '200px',
                                                margin: '10px 0'
                                            }}
                                            onClick={() => onConfirmDeliveryAddress(addr)}
                                        />
                                    }
                            
                                


                            </div>
                        )

                }
            </div>
            

        </div>
    )
}

const CheckoutPage = (props) => {

    const [newAddress, setNewAddress] = useState(false);
    const [address, setAddress] = useState([]);
    const [confirmDeliveryAddress, setConfirmDeliveryAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [orderSummary, setOrderSummary] = useState(false);
    const [emailConfirm, setEmailConfirm] = useState(false);
    const [paymentOption, setPaymentOption] = useState(false);
    const [confirmOrder, setConfirmOrder] = useState(false);
    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);
    const userState = useSelector(state => state.user);
    const cartState = useSelector(state => state.cart);
    const onAddressSubmit = (addr) => {
        setSelectedAddress(addr);
        setConfirmDeliveryAddress(true);
        setOrderSummary(true);
        console.log(confirmDeliveryAddress);
    }

    useEffect(() => {
        if (authState.authenticated) {
            dispatch(getAddress());
        }

    }, [authState.authenticated])

    useEffect(() => {
        const address = userState.address.map(addr => ({ ...addr, selected: false, edit: false }));
        setAddress(address);
    }, [userState.address]);

    const onSelectAddress = (addressId) => {
        const updatedAddress =
            address.map(addr => addr._id === addressId ? { ...addr, selected: true } : { ...addr, selected: false });
        setAddress(updatedAddress);

    }

    const onConfirmDeliveryAddress = (selectedAddress) => {
        setSelectedAddress(selectedAddress);
        setConfirmDeliveryAddress(true);
        setOrderSummary(true);
    }

    const enableAddressEditForm = (selectedAddressId) => {
        const updatedAddress = address.map(addr => addr._id === selectedAddressId ? { ...addr, edit: true } : { ...addr, edit: false });
        setAddress(updatedAddress);
    }

    const userEmailConfirmation = () => {
        setEmailConfirm(true);
        setOrderSummary(false);
        setPaymentOption(true);
    }

    const onConfirmOrder = () => {
        const totalPrice = Object.keys(cartState.cartItems).reduce((totalPrice, key) => {
            const { quantity, price } = cartState.cartItems[key];
            return totalPrice + price * quantity

        }, 0);
        const items = Object.keys(cartState.cartItems).map(key => ({
            productId:key,
            payablePrice:cartState.cartItems[key].price,
            purchasedQty:cartState.cartItems[key].quantity
        }));
        const payload = {
            addressId: selectedAddress._id,
            totalAmount:totalPrice,
            items: items,
            paymentStatus:"pending",
            paymentType:"cod"
        }
        dispatch(addOrder(payload));
        setConfirmOrder(true);
        props.history.push('/account/orders');
    }
    return (
        <Layout>

            <div className="cartContainer" style={{ alignItems: 'flex-start' }}>

                <div className="checkoutContainer">
                    <CheckoutStep
                        stepNumber={'1'}
                        title={'LOGIN'}
                        active={!authState.authenticated}
                        body={
                            authState.authenticated ?
                                <div className="loggedInId">
                                    <span style={{ fontWeight: '500px' }}>{authState.user.fullName}</span>
                                    <span style={{ margin: '0 5px' }}>{authState.user.email}</span>
                                </div> :
                                <MaterialInput
                                    label="email"
                                />
                        }
                    />

                    <CheckoutStep
                        stepNumber={'2'}
                        title={'DELIVERY ADDRESS'}
                        active={!confirmDeliveryAddress && authState.authenticated}
                        body={
                            <>
                                {
                                    confirmDeliveryAddress ? 
                                        <div className="stepCompleted">{`${selectedAddress.name}-${selectedAddress.address} - ${selectedAddress.pinCode}`}</div>
                                    :
                                        address.map(addr =>
                                            <Address
                                                addr={addr}
                                                onSelectAddress={onSelectAddress}
                                                enableAddressEditForm={enableAddressEditForm}
                                                onConfirmDeliveryAddress={onConfirmDeliveryAddress}
                                                onAddressSubmit={onAddressSubmit}
                                            />
                                        )
                                }
                            </>
                        }
                    />
                    {
                        confirmDeliveryAddress ? null :
                            newAddress ?
                                <AddressForm
                                    onSubmitForm={onAddressSubmit}
                                    onCancel={() => { }} />
                                : <CheckoutStep
                                    stepNumber={'+'}
                                    title={'ADD NEW ADDRESS'}
                                    active={false}
                                    onClick={() => setNewAddress(true)}
                                />
                    }

                    <CheckoutStep 
                        stepNumber={'3'}
                        title={'ORDER SUMMARY'}
                        active={orderSummary}
                        body={
                            orderSummary ? <CartPage onlyCartItems={true} /> : 
                            emailConfirm ? 
                            <div className="stepCompleted">{Object.keys(cartState.cartItems).length} items</div>
                            : null
                        }
                    />
                    {
                        orderSummary &&
                        <Card
                            style={{
                                margin: '10px 0'
                            }}
                        >
                            <div
                                className="flexRow sb"
                                style={{
                                    padding: '20px',
                                    alignItems: 'center'
                                }}
                            >
                                <p style={{ fontSize: '12px' }}>
                                    Order confirmation email will be sent to <strong>{authState.user.email}</strong>
                                </p>

                                <MaterialButton
                                    title="CONTINUE"
                                    style={{
                                        width: '200px'
                                    }}
                                    onClick={userEmailConfirmation}
                                />
                            </div>
                        </Card>
                    }
                    
                    <CheckoutStep 
                        stepNumber={'4'}
                        title={'PAYMENT OPTIONS'}
                        active={paymentOption}
                        body={
                            paymentOption &&
                            <div>
                                <div
                                    className="flexRow"
                                    style={{
                                        alignItems:'center',
                                        padding:'20px'
                                    }}
                                >
                                    <input type="radio" name="paymentOption" value="cod" />
                                    <div>Cash on delivery</div>
                                </div>
                                <MaterialButton 
                                    title="CONFIRM ORDER"
                                    onClick={onConfirmOrder}
                                    style={{
                                        width:'200px',
                                        margin:'0 0 20px 20px'
                                    }}
                                />
                            </div>
                        }
                    />
                </div>
                <PriceDetails

                    totalItem={Object.keys(cartState.cartItems).reduce((totalQty, key) => {
                        return totalQty + cartState.cartItems[key].quantity;
                    }, 0)}

                    totalPrice={Object.keys(cartState.cartItems).reduce((totalPrice, key) => {
                        const { quantity, price } = cartState.cartItems[key];
                        return totalPrice + price * quantity

                    }, 0)}

                />

            </div>
        </Layout>
    )
}

export default CheckoutPage
