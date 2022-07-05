import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import Categories from './Categories.js'
import Products from './Products.js'
import Slider from './Slider.js'
import Loader from '../loader/Loader.js'
import stateContext from '../../state/stateContext.js'


import '../../stylesheets/homepage/content.scss'

function HomepageContainer() {
    const { products, fetchingProducts } = useContext(stateContext)
    var size = Object.keys(products).length;

    return (
        <div className='content-container'>
            <Slider />
            <Categories />
            {size !== 0 && fetchingProducts === false ?
                <>
                    <Products products={products.results} />
                    <div className="btn-container">
                        <Link to="/products"><button>View all proucts</button></Link>
                    </div>
                </> :
                <div className='products-container'>
                    <Loader />
                </div>
            }

        </div>
    )
}

export default HomepageContainer