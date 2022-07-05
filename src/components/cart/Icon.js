import React, { useContext } from 'react'
import stateContext from '../../state/stateContext'

import { BiShoppingBag } from 'react-icons/bi'

function Icon() {
    const { cartItems } = useContext(stateContext);
    return (
        <div className='icon-container'>
            <BiShoppingBag className='icon' />
            {cartItems.length !== 0 && <span>{cartItems.length}</span>}
        </div>
    )
}

export default Icon