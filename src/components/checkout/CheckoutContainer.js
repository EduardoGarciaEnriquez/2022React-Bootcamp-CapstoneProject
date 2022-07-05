import React, { useContext } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { Link } from 'react-router-dom';

import stateContext from '../../state/stateContext'
import './Checkout.scss'

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("E-mail is required"),
    zip: yup.number().positive().integer().min(10000).max(90000).
        required("zip/postal code is required."),
    notes: yup.string(),
});

function CheckoutContainer() {
    const { cartItems, setCartItems } = useContext(stateContext);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const submitForm = data => {
        console.log(data)
        alert(data + 'sent');
        reset()
    };

    return (
        <div className='checkout-container'>
            {cartItems.length !== 0 ? <>
                <form name='checkout' id='checkout' onSubmit={handleSubmit(submitForm)}>
                    <input
                        name='name'
                        placeholder='Name'
                        type="text"
                        {...register("name")} />
                    <p>{errors.name?.message}</p>
                    <input
                        name='email'
                        placeholder='e-mail@example.net'
                        type="email"
                        {...register("email")} />
                    <p>{errors.email?.message}</p>
                    <input
                        min={10000}
                        max={99999}
                        name='zip'
                        placeholder='zip/postal code'
                        type="number"
                        {...register("zip")} />
                    <p>{errors.zip?.message}</p>
                    <textarea name='notes' placeholder='Order notes...' {...register("notes")} />
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) =>
                                <tr key={item.id}>
                                    <td>{item.data.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>
                                        {item.data.price} x {item.quantity} =
                                        {item.data.price * item.quantity}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <p>Total: ${
                        cartItems.reduce((prev, current) =>
                            prev + (current.data.price * current.quantity), 0
                        )
                    }.00
                    </p>
                    <div className='buttons-container'>

                        <button><Link to="/cart">Back to Cart</Link></button>

                        <button type="submit" id='submit' submitForm="checkout">
                            Place order</button>
                    </div>
                </form>

            </> :
                <p>
                    Nothing here, go to the <Link to="/home">main page</Link> and add some items.
                </p>
            }

        </div>
    )
}

export default CheckoutContainer