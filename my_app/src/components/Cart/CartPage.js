import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import './Cart.css'
const CartPage = () => {
    const { cartItems } = useContext(CartContext);
    return (
        <div>
            <h1 className='cart'>Giỏ hàng</h1>
            {cartItems && cartItems.map((item) => (
                <div key={item.id}>
                    <p>{item.title}</p>
                </div>
            ))}
        </div>
    );

}
export default CartPage;
