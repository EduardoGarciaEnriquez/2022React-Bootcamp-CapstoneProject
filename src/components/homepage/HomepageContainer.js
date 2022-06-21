import React from 'react'
import { Link } from 'react-router-dom'
import Categories from './Categories.js'
import Products from './Products.js'
import Slider from './Slider.js'

import ProductsData from '../../mocks/en-us/featured-products.json'

import '../../stylesheets/homepage/content.scss'

function HomepageContainer({ data }) {

    return (
        <div className='content-container'>
            <Slider />
            <Categories />
            <Products ProductsData={ProductsData.results} />
            <div className="btn-container">
                <Link to="/products-list"><button>View all proucts</button></Link>
            </div>
        </div>
    )
}

export default HomepageContainer