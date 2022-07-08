import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import stateContext from '../../state/stateContext'
import { useProduct } from '../../utils/hooks/useProduct';
import ProductSlider from './ProductSlider/ProductSlider';
import './ProductDetail.scss';
import Loader from '../loader/Loader';

function ProductDetailContainer() {
    const [input, setInput] = useState(1);
    const [isEnabled, setIsEnabled] = useState(true)

    const { cartItems, setCartItems } = useContext(stateContext);
    const { productId } = useParams();
    const { product, fetchingProduct } = useProduct(productId);
    var size = Object.keys(product).length;

    useEffect(() => {
        if (size !== 0) {
            product.results[0].data.stock < input ? setIsEnabled(false) : setIsEnabled(true);

            if (cartItems.length !== 0) {
                var exists = cartItems.find(item => item.id === product.results[0].id);
                if (exists) {
                    setInput(
                        input >= exists.quantity ?
                            input :
                            exists.quantity)
                }
            }
        }
    }, [input, size, product.results, cartItems])

    const addQuantity = (product) => {
        const exists = cartItems.find(item => item.id === product.id);
        if (product.data.stock >= input) {
            if (exists) {
                setCartItems(cartItems.map(item => item.id === product.id ?
                    {
                        ...exists, quantity: input,
                    }
                    : item)
                )
            }
            else {
                setCartItems([...cartItems, { ...product, quantity: input }])
            }
        }
    }

    const handleOnChange = (e) => {
        let inputValue = parseInt(e.target.value);
        if (inputValue || inputValue > 1 || inputValue <= product.results[0].data.stock) {
            setInput(inputValue);
        } else {
            setIsEnabled(false)
        }
    }

    return (
        <div className='product-detail-container'>
            {size !== 0 && fetchingProduct === false ?
                <>
                    <ProductSlider images={product.results[0].data.images} />

                    <div className="product-detail-content">
                        <p><b>Name</b>: {product.results[0].data.name}</p>
                        <p><b>Price</b>: ${product.results[0].data.price}</p>
                        <p><b>SKU</b>: {product.results[0].data.sku}</p>
                        <p><b>Category</b>: {product.results[0].data.category.slug}</p>
                        <p><b>Tags</b>:</p>
                        <ul>
                            {product.results[0].tags.map((item) =>
                                <li key={item}>{item}</li>
                            )}
                        </ul>
                        <p>{product.results[0].data.description[0].text}</p>
                        <input
                            min={1}
                            max={product.results[0].data.stock}
                            pattern='[0-9]*'
                            type="number"
                            name="units"
                            value={input}
                            onChange={(e) => handleOnChange(e)} />
                        <span><b>/ {product.results[0].data.stock} </b> </span>
                        <button
                            className={isEnabled ? 'enabled' : 'disabled'}
                            onClick={() => addQuantity(product.results[0], input)}>
                            add to cart
                        </button>
                    </div>
                    <div className="table-container">
                        <p>Specs</p>
                        <table className="responsive-table">
                            <thead
                                className="responsive-table__head"
                            >
                                <tr className='responsive-table__row'>
                                    <th
                                        className="responsive-table__head__title
                                     responsive-table__head__title--name">
                                        Name</th>
                                    <th
                                        className="responsive-table__head__title 
                                    responsive-table__head__title--value">
                                        Value</th>
                                </tr>
                            </thead>
                            <tbody className="responsive-table__body">
                                {product.results[0].data.specs.map((item, i) =>
                                    <tr className="responsive-table__row" key={'spec-' + i}>
                                        <td
                                            className='responsive-table__body__text 
                                        responsive-table__body__text--name'>
                                            {item.spec_name}</td>
                                        <td
                                            className='responsive-table__body__text 
                                        responsive-table__body__text--value'>
                                            {item.spec_value}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>



                </> :
                <div style={{ textAlign: 'center',margin:'0 auto', marginTop: '80px' }}>
                    <Loader />
                </div>
            }
        </div>
    )
}

export default ProductDetailContainer