
import './App.css';
import HomePage from './containers/HomePage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ProductListPage from './containers/ProductListPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, updateCart } from './actions';
import ProductDetailsPage from './containers/ProductDetailsPage';
import CartPage from './containers/CartPage';
import CheckoutPage from './containers/CheckoutPage';
import OrderPage from './containers/OrderPage';
import OrderDetailsPage from './containers/OrderDetailsPage';

function App() {

  const authReducer = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(!authReducer.authenticated){
      dispatch(isUserLoggedIn());
    }
  },[authReducer.authenticated]);

  useEffect(()=>{
    dispatch(updateCart());
  },[authReducer.authenticated]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage}/>
          <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/account/orders" component={OrderPage} />
          <Route path="/order_details/:orderId" component={OrderDetailsPage} />
          <Route path="/:productSlug/:productId/p" component={ProductDetailsPage} />
          <Route path="/:slug" component={ProductListPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
