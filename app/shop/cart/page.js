"use client"

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { loadStripe } from '@stripe/stripe-js';
import BuyButton from '@/component/shopping/buy-button';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  
function getCart() {
    const cart = JSON.parse(Cookies.get('cart') || '[]');
    return cart;
}

function setCart(cart) {
    Cookies.set('cart', JSON.stringify(cart), { expires: 7 });
}

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [checkoutStatus, setCheckoutStatus] = useState('')

    useEffect(() => {
    // Handle initial cart setup
    const cart = getCart();
    setCartItems(cart);
    updateTotalPrice(cart);

    // Check URL for payment status
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
        setCheckoutStatus('Merci pour votre commande !')
        setModalMessage('Fif met tout en oeuvre pour vous livrer au plus vite.');
        setShowModal(true);
        console.log('cartItemsOK:', cart);
        testApi(cart);
    } else if (query.get('canceled')) {
        setCheckoutStatus('Commande annulée')
        setModalMessage('Continuez vos achats et revenez payer quand vous serez prêts !');
        setShowModal(true);
    }
}, []);


    const updateTotalPrice = (cart) => {
        const total = cart.reduce((acc, item) => acc + item.quantity * (item.price || 0), 0);
        setTotalPrice(total);
    };

    const handleQuantityChange = (id, size, delta) => {
        const newCart = cartItems.map(item => {
            if (item.id === id && item.size === size) {
                const newQuantity = item.quantity + delta;
                return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
            }
            return item;
        });
        setCartItems(newCart);
        setCart(newCart);
        updateTotalPrice(newCart);
    };

    const handleRemoveItem = (id, size) => {
        const newCart = cartItems.filter(item => !(item.id === id && item.size === size));
        setCartItems(newCart);
        setCart(newCart);
        updateTotalPrice(newCart);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-5">Your Shopping Cart</h1>
            <ul>
                {cartItems.map(item => (
                    <li key={`${item.id}-${item.size}`} className="flex items-center justify-between mb-4 p-4 shadow">
                        <div className="flex items-center">
                            <Image src={item.image} alt={item.title} width={100} height={100} className="rounded"/>
                            <div className="ml-4">
                                <h2 className="text-xl font-semibold">{item.title}</h2>
                                <p>Size: {item.size}</p>
                                <p>${(item.price || 0).toFixed(2)} each</p>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => handleQuantityChange(item.id, item.size, -1)}
                                className="bg-red-500 text-white px-2 py-1 mx-1 rounded">-</button>
                            <span className="text-lg mx-2">{item.quantity}</span>
                            <button onClick={() => handleQuantityChange(item.id, item.size, 1)}
                                className="bg-green-500 text-white px-2 py-1 mx-1 rounded">+</button>
                            <button onClick={() => handleRemoveItem(item.id, item.size)}
                                className="ml-4 bg-fuchsia-950 hover:bg-fuchsia-700 text-white px-2 py-1 rounded">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="text-xl font-bold mt-6">
                Total: {(totalPrice || 0).toFixed(2)} €
            </div>
            <BuyButton />
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">{checkoutStatus}</h2>
                        <p>{modalMessage}</p>
                        <button onClick={closeModal} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;
