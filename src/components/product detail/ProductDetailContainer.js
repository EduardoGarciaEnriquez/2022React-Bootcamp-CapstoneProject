import React from 'react'
import { useParams } from 'react-router-dom';

import { useProduct } from '../../utils/hooks/useProduct';
import ProductSlider from './ProductSlider/ProductSlider';
import './ProductDetail.scss';

function ProductDetailContainer() {
    const { productId } = useParams();
    const { product, fetchingProduct } = useProduct(productId);
    var size = Object.keys(product).length;

    return (
        <div className='product-detail-container'>
            {size !== 0 && fetchingProduct === false ?
                <>
                    <ProductSlider images={product.results[0].data.images} />
                    <p>Name: {product.results[0].data.name}</p>
                    <p>Price: ${product.results[0].data.price}</p>
                    <p>SKU: {product.results[0].data.sku}</p>
                    <p>Category: {product.results[0].data.category.slug}</p>
                    <p>Tags:</p>
                    <ul>
                        {product.results[0].tags.map((item) =>
                            <li key={item}>{item}</li>
                        )}
                    </ul>
                    <p>{product.results[0].data.description[0].text}</p>
                    <input type="number" name="units" />
                    <button>add to cart</button>
                    <p>Specs</p>
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Value</th>
                        </tr>
                        {product.results[0].data.specs.map((item, i) =>
                            <tr key={'spec-' + i}>
                                <td>{item.spec_name}</td>
                                <td>{item.spec_value}</td>
                            </tr>
                        )}
                    </table>

                </> :
                <>Loading product...</>
            }
        </div>
    )
}

export default ProductDetailContainer