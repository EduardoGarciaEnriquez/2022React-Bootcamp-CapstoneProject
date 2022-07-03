import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import stateContext from '../../state/stateContext';
import '../../stylesheets/homepage/content.scss';

function Products({ products }) {
    const { setProductDetail } = useContext(stateContext)
    var size = Object.keys(products).length;

    const handleOnClick = (product) => {
        setProductDetail(product);
    }

    return (
        <>
            {(size !== 0) &&
                <div className='products-container'>
                    {products.map((product) =>
                        <Link
                            to={'/product/'+product.id}
                            onClick={() => handleOnClick(product)}
                            key={product.id}
                            className='product'>
                            <img alt="product-img" src={product.data.mainimage.url} />
                            <div className="top-left">{product.data.category.slug}</div>
                            <div className="top-right">
                                <b>${product.data.price}</b>
                            </div>
                            <div className="content">
                                <h2>{product.data.name}</h2>
                                <button>Add to cart</button>
                            </div>
                        </Link>
                    )}
                </div>
            }
        </>
    )
}

export default Products