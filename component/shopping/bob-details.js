"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import Link from 'next/link';

export default function BobDetails({ bob, bobSizes }) {
    const [selectedSize, setSelectedSize] = useState(null);
    const [showModal, setShowModal] = useState(false);  // état pour la visibilité de la modal

    function handleAddToCart(bob, selectedSize) {
        const cart = JSON.parse(Cookies.get('cart') || '[]');
        const itemIndex = cart.findIndex(item => item.id === bob.id && item.size === selectedSize);
    
        if (itemIndex !== -1) {
            cart[itemIndex].quantity += 1;
        } else {
            cart.push({ 
                id: bob.id, 
                title: bob.title, 
                image: bob.image,
                size: selectedSize, 
                price: bob.price, 
                quantity: 1 
            });
        }
    
        Cookies.set('cart', JSON.stringify(cart), { expires: 7 });
        console.log(`Added ${bob.title}, Size: ${selectedSize}, Price: ${bob.price}€ to cart`);
        setShowModal(true);
    }
    

    function closeModal() {
        setSelectedSize(null);
        setShowModal(false);  // Fermer la modal
    }

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-5 text-center">
                <h3 className="text-3xl font-semibold text-gray-900">{bob.title}</h3>
                <p className="mt-2 text-lg text-gray-500">{bob.description}</p>
            </div>
            <div className='max-w-5xl mx-auto'>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                    <div className="h-80 relative">
                        <Image src={bob.image} alt={bob.title} fill objectFit='contain' />
                    </div>
                    <div>
                        <div className="text-center">
                            <h2 className="text-3xl font-medium text-gray-700">Available Sizes</h2>
                            <ul className="mt-5 text-2xl flex flex-col items-center">
                                {bobSizes.map(({ size, stock }) => (
                                    <li key={size} 
                                        className={`mt-4 px-4 py-1 rounded-md cursor-pointer ${size === selectedSize ? 'bg-fuchsia-700 text-white' : ''} ${stock > 0 ? 'hover:bg-fuchsia-700 text-gray-900 hover:text-white' : 'text-gray-500'}`}
                                        onClick={() => stock > 0 ? setSelectedSize(size) : null}>
                                        {size} {stock > 0 ? '' : "(Épuisé)"}
                                    </li>
                                ))}
                            </ul>
                            {selectedSize ? (
                                <button className="text-xl font-semibold text-white bg-fuchsia-950 hover:bg-fuchsia-800 px-6 py-2 rounded-md" onClick={() => handleAddToCart(bob, selectedSize)}>
                                    Add to Cart for {bob.price} €
                                </button>
                            ) : (
                                <button className="text-xl font-semibold text-white bg-fuchsia-950 px-6 py-2 rounded-md" disabled>
                                    Select a size
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-8 rounded-lg w-full max-w-2xl mx-4">
                            <p className="text-lg">Your bobdefif has been added to the cart!</p>
                            <div className="flex justify-between mt-6">
                                <button className="bg-fuchsia-950 text-white px-5 py-2 rounded hover:bg-fuchsia-700 transition-colors" onClick={closeModal}>
                                    Back to shopping
                                </button>
                                <Link href="/shop/cart" className="bg-fuchsia-950 text-white px-5 py-2 rounded hover:bg-fuchsia-700 transition-colors" onClick={closeModal}>
                                    Go to cart
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
