import React, { useState, useEffect, useContext } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai'
import stateContext from '../../state/stateContext';

import './Sidebar.scss';

function SidebarContainer({ isVisible, showHideSidebar, filterProducts }) {
    let navigate = useNavigate();
    const { categories, fetchingCategories } = useContext(stateContext)
    const [categoryArray, setCategoryArray] = useState([])

    var size = Object.keys(categories).length;

    //url params
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const category = searchParams.get("category");

    useEffect(() => {
        if (size !== 0) {
            if (categoryArray.length === 0) {
                let array = categories.results;
                array.forEach(element => {
                    element.slugs[0] === category ?
                        element.active = true :
                        element.active = false
                });
                setCategoryArray(array)
            }
            else {
                let array = categoryArray;
                setCategoryArray(array)
            }
        }
    }, [size, categoryArray, category, categories.results])



    const handleOnClick = (categoryItem) => {
        let array = categoryArray;
        let index = array.findIndex(item => {
            return item.slugs[0] === categoryItem.slugs[0]
        })
        if (category === array[index].slugs[0]) {
            navigate("/products");
        }

        array[index].active = !array[index].active;

        setCategoryArray(array);
        filterProducts(categoryItem.slugs[0]);
        showHideSidebar();
    }

    const clearFilters = () => {
        let array = categories.results;
        array.forEach(element => {
            element.active = false;
        });
        setCategoryArray(array);
        filterProducts();
        showHideSidebar();
    }

    return (
        <div className={isVisible ? "sidebar-container" : "hide"}>
            <AiOutlineClose className='close-btn' onClick={showHideSidebar} />
            {(Object.keys(categoryArray).length !== 0 && fetchingCategories === false) ?
                <div className="sidebar-content">
                    {categoryArray.map((category, i) =>
                        <button
                            className={
                                category.active === true ? 'active' : 'not-active'
                            }
                            onClick={() => handleOnClick(category)}
                            key={category.slugs[0]}
                            id={i}
                        >
                            {category.data.name}
                        </button>
                    )}
                    {(categoryArray.filter(item => item.active === true).length !== 0) &&
                        <Link to="/products" style={{ textDecoration: 'none' }}>
                            <button
                                onClick={clearFilters}
                                className='not-active'>
                                Clear Filters
                            </button>
                        </Link>
                    }
                </div> :
                <div className="sidebar-content">
                    <button className='not-active'>Loading categories...</button>
                </div>
            }
        </div>
    )
}

export default SidebarContainer