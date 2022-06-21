import React, { useState, useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import CategoriesData from '../../mocks/en-us/product-categories.json'

import './Sidebar.scss';

function SidebarContainer({ isVisible, showHideSidebar, filterProducts }) {
    const [categoryArray, setCategoryArray] = useState(CategoriesData.results)

    useEffect(() => {
        let array = CategoriesData.results;
        array.forEach(element => {
            element.active = false;
        });
        setCategoryArray(array)
    }, [])

    const handleOnClick = (e, category) => {
        let array = categoryArray;
        let index = array.findIndex(item => {
            return item.slugs[0] === category.slugs[0]
        })
        array[index].active = !array[index].active;
        setCategoryArray(array);
        filterProducts(category.id);
        showHideSidebar();
    }

    return (
        <div className={isVisible ? "sidebar-container" : "hide"}>
            <AiOutlineClose className='close-btn' onClick={showHideSidebar} />
            <div className="sidebar-content">
                {categoryArray.map((category, i) =>
                    <button
                        className={
                            category.active === true ? 'active' : 'not-active'
                        }
                        onClick={(e) => handleOnClick(e, category)}
                        key={category.slugs[0]}
                        id={i}
                    >
                        {category.data.name}
                    </button>
                )}
            </div>
        </div>
    )
}

export default SidebarContainer