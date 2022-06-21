import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi';
import SidebarContainer from '../sidebar/SidebarContainer'
import Products from '../homepage/Products';
import ProductsData from '../../mocks/en-us/products.json';

import './ProductsList.scss'

function ProductListContainer() {
    const [isVisible, setIsVisible] = useState(false)
    const [productsList, setProductsList] = useState(ProductsData.results)
    const [categoriesList, setCategoriesList] = useState([])

    useEffect(() => {
        if (categoriesList.length > 0) {
            let products = [];
            categoriesList.forEach(element => {
                products = [...products, ...ProductsData.results.filter(item => {
                    return item.data.category.id === element
                })]
            });

            setProductsList(products);
        }
        else { setProductsList(ProductsData.results) }
    }, [categoriesList])

    const showHideSidebar = () => {
        setIsVisible(!isVisible)
    }

    const filterProducts = (categoryId) => {
        let index = categoriesList.findIndex(item => {
            return item === categoryId
        })
        if (index !== -1) {
            setCategoriesList(categoriesList.filter(item => {
                return item !== categoryId
            }))
        } else {
            setCategoriesList([...categoriesList, categoryId]);
        }
    }

    return (
        <>
            <div className='products-list-container'>
                <button onClick={() => setIsVisible(true)}><GiHamburgerMenu /></button>
                {productsList.length > 0 ?
                    <>
                        <Products ProductsData={productsList} />
                        {/* <div className="pagination-container">
                            <div className="pagination-content">
                                <button>&laquo;</button>
                                <button>1</button>
                                <button className="active">2</button>
                                <button>3</button>
                                <button>&raquo;</button>
                            </div>
                        </div> */}
                        <div className="pagination-container">
                            <ul className="pagination-content">
                                <li><Link to="/products-list">&laquo;</Link></li>
                                <li><Link to="/products-list" className='active'>1</Link></li>
                                <li><Link to="/products-list">2</Link></li>
                                <li><Link to="/products-list">...</Link></li>
                                <li><Link to="/products-list">&raquo;</Link></li>
                            </ul>
                        </div>
                    </> :
                    <h3>Nothing to show. Try adding more filters</h3>
                }
            </div>
            <SidebarContainer isVisible={isVisible} showHideSidebar={showHideSidebar}
                filterProducts={filterProducts} />
        </>
    )
}

export default ProductListContainer