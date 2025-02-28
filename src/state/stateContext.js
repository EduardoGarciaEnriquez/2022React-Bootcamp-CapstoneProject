import React  from 'react'

const stateContext = React.createContext({
    //slide state:
    banners: [],
    fetchingBanners: false,

    //categories:
    categories: [],
    fetchingCategories: false,
    
    //products state:
    products: [],
    fetchingProducts: false,

    //cart
    cartItems: [],
    setCartItems: () => {},
});

export default stateContext;