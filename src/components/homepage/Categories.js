import React, { useContext } from 'react'
import { Link } from 'react-router-dom';

import stateContext from '../../state/stateContext';
import '../../stylesheets/homepage/content.scss';

function Categories() {
    const { categories, fetchingCategories } = useContext(stateContext)
    var size = Object.keys(categories).length;

    return (
        <>
            {(size !== 0 && fetchingCategories === false) ?
                <div className='categories-container'>
                    {categories.results.map((category) =>
                        <Link
                            to={'/products?category=' + category.slugs[0]}
                            key={category.id}
                            className='category'>
                            <img alt="category-img" src={category.data.main_image.url} />
                            <div className="overlay">
                                <div className="text">{category.data.name}</div>
                            </div>
                        </Link>
                    )}
                </div> :
                <div className='categories-container'>Loading categories...</div>
            }
        </>
    )
}

export default Categories