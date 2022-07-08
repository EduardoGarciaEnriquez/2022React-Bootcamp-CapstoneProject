import React, { useState, useEffect, useContext, useCallback } from 'react'
import { useLocation } from 'react-router-dom';

import { GiHamburgerMenu } from 'react-icons/gi';

import SidebarContainer from '../sidebar/SidebarContainer'
import Products from '../homepage/Products';
import Pagination from './Pagination/PaginationContainer';
import stateContext from '../../state/stateContext.js'
import './ProductsList.scss'

function ProductListContainer() {
    //context
    const { products, fetchingProducts } = useContext(stateContext)
    var size = Object.keys(products).length;

    //local state
    const [isVisible, setIsVisible] = useState(false)
    const [productsList, setProductsList] = useState([])
    const [categoriesList, setCategoriesList] = useState([])

    //pagination
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(12);
    const totalPages = Math.ceil(productsList.length / perPage);

     //url params
     const { search } = useLocation();
     const searchParams = new URLSearchParams(search);
     const category = searchParams.get("category");

    useEffect(() => {
        if (categoriesList.length > 0) {
            let productsArray = [];
            categoriesList.forEach(element => {
                productsArray = [...productsArray, ...products.results.filter(item => {
                    return item.data.category.slug === element
                })]
            });

            setProductsList(productsArray);
        }
        else {
            if (size !== 0) {
                setProductsList(products.results)
                setPerPage(12);

                if (category !== null) {
                    let index = categoriesList.findIndex(item => {
                        return item === category
                    })
                    if (index !== -1) {
                        setCategoriesList(categoriesList.filter(item => {
                            return item !== category
                        }))
                    } else {
                        if (category) {
                            setCategoriesList([...categoriesList, category]);
                        }
                        else {
                            setCategoriesList([]);
                        }
                    }
                }
            }
        }
    }, [categoriesList, size, products.results, category])




    const showHideSidebar = () => {
        setIsVisible(!isVisible)
    }

    const filterProducts = useCallback(categoryId => {
        if (categoryId !== null) {
            let index = categoriesList.findIndex(item => {
                return item === categoryId
            })
            if (index !== -1) {
                setCategoriesList(categoriesList.filter(item => {
                    return item !== categoryId
                }))
            } else {
                if (categoryId) {
                    setCategoriesList([...categoriesList, categoryId]);
                }
                else {
                    setCategoriesList([]);
                }
            }
        }
    }, [categoriesList])


    return (
        <>
            <div className='products-list-container'>
                <button onClick={() => setIsVisible(true)}><GiHamburgerMenu /></button>
                {fetchingProducts === false ?
                    <>
                        {productsList.length !== 0 ?
                            <>
                                <Products products={productsList
                                    .slice((page - 1) * perPage, (page - 1) * perPage + perPage)} />

                                <Pagination
                                    page={page}
                                    setPage={setPage}
                                    totalPages={totalPages} />
                            </>
                            :
                            <h3>Nothing to show. Try adding more filters</h3>
                        }
                    </> :
                    <div>
                        Loading products...
                    </div>
                }
            </div>
            <SidebarContainer isVisible={isVisible} showHideSidebar={showHideSidebar}
                filterProducts={filterProducts} />
        </>
    )
}

export default ProductListContainer