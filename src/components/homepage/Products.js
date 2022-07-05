import React, { useContext } from 'react'

import Product from '../product/Product.js'
import stateContext from '../../state/stateContext'

import '../../stylesheets/homepage/content.scss';

function Products({ products }) {
    const { cartItems, setCartItems } = useContext(stateContext);
    var size = Object.keys(products).length;

    const addItem = (product) => {
        const exists = cartItems.find(item => item.id === product.id);
        if (exists) {
            setCartItems(cartItems.map(item => item.id === product.id ?
                {...exists, quantity: 
                    (exists.data.stock > exists.quantity ? (exists.quantity + 1):exists.quantity)} 
                : item )
            )
        }
        else {
            setCartItems([...cartItems, { ...product, quantity: 1 }])
        }
    }

    return (
        <>
            {(size !== 0) &&
                <div className='products-container'>
                    {products.map((product) =>
                        <Product
                            addItem={() => addItem(product)}
                            key={product.id}
                            product={product} />
                    )}
                </div>
            }
        </>
    )
}

export default Products