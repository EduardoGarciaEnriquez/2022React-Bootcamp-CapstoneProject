import React from 'react'

import '../../stylesheets/homepage/content.scss';

function Products({ProductsData}) {
    return (
        <div className='products-container'>
            {ProductsData.map((product) =>
                <div key={product.id} className='product'>
                    <img alt="product-img" src={product.data.mainimage.url} />
                    <div className="top-left">{product.data.category.slug}</div>
                    <div className="top-right">
                        <b>${product.data.price}</b>
                    </div>
                    <div className="content">
                        <h2>{product.data.name}</h2>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Products