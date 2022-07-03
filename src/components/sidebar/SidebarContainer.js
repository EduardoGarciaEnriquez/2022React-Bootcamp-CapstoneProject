import React, { useState, useEffect, useContext } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import stateContext from '../../state/stateContext';

import './Sidebar.scss';

function SidebarContainer({ isVisible, showHideSidebar, filterProducts }) {
    const { categories, fetchingCategories } = useContext(stateContext)
    const [categoryArray, setCategoryArray] = useState([])
    var size = Object.keys(categories).length;

    useEffect(() => {
        if (size !== 0) {
            let array = categories.results;
            array.forEach(element => {
                element.active = false;
            });
            setCategoryArray(array)
        }
    }, [size, categoryArray])

    const handleOnClick = (category) => {
        let array = categoryArray;
        let index = array.findIndex(item => {
            return item.slugs[0] === category.slugs[0]
        })
        array[index].active = !array[index].active;
        setCategoryArray(array);
        filterProducts(category.slugs[0]);
        showHideSidebar();
    }

    const clearFilters = () => {
        let array = categories.results;
        array.forEach(element => {
            element.active = false;
        });
        setCategoryArray(array);
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
                        <button onClick={clearFilters} className='not-active'>
                            Clear Filters
                        </button>
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