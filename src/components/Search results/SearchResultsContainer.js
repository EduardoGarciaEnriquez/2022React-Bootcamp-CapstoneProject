import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useSearchProduct } from '../../utils/hooks/useSearchProduct';
import Pagination from '../products list/Pagination/PaginationContainer';

function SearchResultsContainer() {
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
    const [perPage, setPerPage] = useState(3);
    const totalPages = Math.ceil(productsList.length / perPage);

    useEffect(() => {
        if(size !== 0){
            setProductsList(searchProduct.results)
        }
    }, [size])

    return (
        <div style={{ paddingTop: '60px', backgroundColor: 'pink', minHeight: '100vh' }}>
            <p>results for: {searchTerm}</p>
            {size !== 0 && fetchingSearchProduct === false ? <>
                {productsList.length !== 0 ?
                    <div className='products-container'>
                        {productsList.map((product) =>
                            <Link
                                to={'/product/' + product.id}
                                key={product.id}
                                className='product'>
                                <img alt="product-img" src={product.data.mainimage.url} />
                                <div className="top-left">{product.data.category.slug}</div>
                                <div className="top-right">
                                    <b>${product.data.price}</b>
                                </div>
                                <div className="content">
                                    <h2>{product.data.name}</h2>
                                    {/* <p>{product.data.description[0].text}</p> */}
                                    <button>Add to cart</button>
                                </div>
                            </Link>
                        )}
                        {productsList.length > 20 && <Pagination
                            page={page}
                            setPage={setPage}
                            totalPages={totalPages} />}
                    </div> : <>Your search couldn't find any results. Try again.</>}
            </> : <>Loading Products...</>}
        </div>
    )
}

export default SearchResultsContainer