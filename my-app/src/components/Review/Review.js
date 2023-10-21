import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImg from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([]);
    const [oderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOrder = () => {
            setCart([]);
            setOrderPlaced(true);
            processOrder();
        };

    const handleRemoveProduct = (productKey) => {
        console.log(productKey);
        const newCart = cart.filter(pd => pd.key!== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);

        const cartProducts = productKeys.map(key => {
         const product = fakeData.find(pd => pd.key === key);
         product.quantity = saveCart[key];
         return product;
        });
        setCart(cartProducts);
    },[]);
    let thankyou;
    if(oderPlaced){
        thankyou = <img src={happyImg} alt="" />
    }
    return (
        <div className='twin-container'>
            <div className='product-container'>
                <h1>Cart items:{cart.length}</h1>
                {
                    cart.map(pd => <ReviewItem 
                        key={pd.key} 
                        removeProduct={handleRemoveProduct} 
                        product={pd}></ReviewItem>)
                }
                {
                    thankyou
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className='main-button'>Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;