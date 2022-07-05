import React from 'react'
import { Link } from 'react-router-dom'

function Product({ product, addItem }) {

    return (
        <div className='product'>
            <img alt="product-img" src={product.data.mainimage.url} />
            <div className="top-left">{product.data.category.slug}</div>
            <div className="top-right">
                <b>${product.data.price}</b>
            </div>

            <div className="content">
                <Link
                    to={'/product/' + product.id}>
                    <h2>{product.data.name}</h2>
                </Link>
                <button onClick={() => addItem(product)}>Add to cart</button>
            </div>
        </div>
    )
}

export default Product