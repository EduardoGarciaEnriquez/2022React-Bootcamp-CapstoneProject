import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useSearchProduct } from '../../utils/hooks/useSearchProduct';
import Loader from '../loader/Loader';
import Pagination from '../products list/Pagination/PaginationContainer';
import stateContext from '../../state/stateContext'
import './SearchResults.scss';

function SearchResultsContainer() {
    //context
    const { cartItems, setCartItems } = useContext(stateContext);

    //local state
    const [productsList, setProductsList] = useState([])

    //url params
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const searchTerm = searchParams.get("q");

    const { searchProduct, fetchingSearchProduct } = useSearchProduct(searchTerm);

    var size = Object.keys(searchProduct).length;

    //pagination
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(12);
    const totalPages = Math.ceil(productsList.length / perPage);

    const value = search;

    useEffect(() => {
        if (size !== 0) {
            setPerPage(12);
            setProductsList(searchProduct.results)
        }
    }, [size, search, value, searchProduct.results])

    const addItem = (product) => {
        const exists = cartItems.find(item => item.id === product.id);
        if (exists) {
            setCartItems(cartItems.map(item => item.id === product.id ?
                {
                    ...exists, quantity:
                        (exists.data.stock > exists.quantity ? 
                            (exists.quantity + 1)
                             : exists.quantity),
                }
                : item)
            )
        }
        else {
            setCartItems([...cartItems, { ...product, quantity: 1 }])
        }
    }

    return (
        <div className='search-results-container'>
            <p className='results-for'><b>Results for:</b> {searchTerm}</p>
            {size !== 0 && fetchingSearchProduct === false ? <>
                {productsList.length !== 0 ?
                    <div className='products-container'>
                        {productsList.map((product) =>
                            <div
                                key={product.id}
                                className='product'>
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
                                    <p>{product.data.description[0].text}</p>
                                    <button onClick={() => addItem(product)}>Add to cart</button>
                                </div>
                            </div>
                        )}
                        {productsList.length > 20 && <Pagination
                            page={page}
                            setPage={setPage}
                            totalPages={totalPages} />}
                    </div> : <>Your search couldn't find any results. Try again.</>}
            </> :
                <div style={{ textAlign: 'center', marginTop: '80px' }}>
                    <Loader />
                </div>
            }
        </div>
    )
}

export default SearchResultsContainer