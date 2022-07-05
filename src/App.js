import React, { useState } from 'react'
import { useFeaturedBanners } from './utils/hooks/useFeaturedBanners';
import { useFeaturedCategories } from './utils/hooks/useFeaturedCategories';
import { useFeaturedProducts } from './utils/hooks/useFeaturedProducts'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import HomepageContainer from './components/homepage/HomepageContainer';
import ProductListContainer from './components/products list/ProductListContainer';
import ProductDetailContainer from './components/product detail/ProductDetailContainer';
import SearchResultsContainer from './components/Search results/SearchResultsContainer';
import CartContainer from './components/cart/CartContainer';
import CheckoutContainer from './components/checkout/CheckoutContainer';
import Header from './components/Header';
import Footer from './components/Footer';

import stateContext from './state/stateContext';

import './stylesheets/homepage/header.scss';

function App() {
  const { banners, fetchingBanners } = useFeaturedBanners();
  const { categories, fetchingCategories } = useFeaturedCategories();
  const { products, fetchingProducts } = useFeaturedProducts();
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <stateContext.Provider
        value={{
          banners,
          fetchingBanners,
          categories,
          fetchingCategories,
          products,
          fetchingProducts,

          cartItems,
          setCartItems,
        }}
      >
        <Header />
        <Routes>
          <Route path='/' element={<HomepageContainer />} />
          <Route path='/home' element={<HomepageContainer />} />
          <Route path='/products' element={<ProductListContainer />} />
          <Route path='/product/:productId' element={<ProductDetailContainer />} />
          <Route path='/search' element={<SearchResultsContainer />} />
          <Route path='/cart' element={<CartContainer />} />
          <Route path='/checkout' element={<CheckoutContainer />} />
        </Routes>
      </stateContext.Provider>
      <Footer />
    </Router>
  );
}

export default App;
