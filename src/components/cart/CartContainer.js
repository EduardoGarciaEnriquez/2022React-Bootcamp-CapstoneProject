import React, { useContext } from 'react'
import { Link } from 'react-router-dom';

import stateContext from '../../state/stateContext'
import './Cart.scss';

function CartContainer() {
    const { cartItems, setCartItems } = useContext(stateContext);

    const addItem = (product) => {
        const exists = cartItems.find(item => item.id === product.id);
        if (exists) {
            setCartItems(cartItems.map(item => item.id === product.id ?
                {
                    ...exists, quantity:
                        (exists.data.stock > exists.quantity ?
                            (exists.quantity + 1) : exists.quantity),
                }
                : item)
            )
        }
        else {
            setCartItems([...cartItems, { ...product, quantity: 1 }])
        }
    }

    const removeItem = (product) => {
        const exists = cartItems.find(item => item.id === product.id);
        if (exists.quantity === 1) {
            setCartItems(cartItems.filter(item => item.id !== product.id))
        }
        else {
            setCartItems(
                cartItems.map(item => item.id === product.id ?
                    { ...exists, quantity: exists.quantity - 1 } : item)
            )
        }
    }

    return (
        <div className='cart-page'>
            {cartItems.length !== 0 ? <div>
                <div className='table-container'>
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>add</th>
                                <th>Subtotal</th>
                                <th>remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) =>
                                <tr key={item.id}>
                                    <td><img src={item.data.mainimage.url} alt="item-img" /></td>
                                    <td>{item.data.name}</td>
                                    <td>{item.data.price}</td>
                                    <td><button onClick={() => addItem(item)}>+</button></td>
                                    <td>
                                        ${item.data.price}.00 x {item.quantity} =
                                        ${item.data.price * item.quantity}.00
                                    </td>
                                    <td><button onClick={() => removeItem(item)}>-</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Link to="/checkout">
                    <button style={{ marginTop: '20px', marginLeft:'5%' }}>
                        Checkout ${
                            cartItems.reduce((prev, current) =>
                                prev + (current.data.price * current.quantity), 0
                            )
                        }.00
                    </button>
                </Link>
            </div> :
                <p style={{width:'90%', margin: '85px auto', marginTop:'85px'}}>
                    Nothing here, go to the <Link to="/home">main page</Link> and add some items.
                </p>}
        </div>
    )
}

export default CartContainer