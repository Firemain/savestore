"use client";

import { useState } from 'react';

export default function NewBobForm() {
    const [bobData, setBobData] = useState({
        title: '',
        description: '',
        price: '',
        priceIdStripe: '',
        image: null
    });
    const [sizes, setSizes] = useState([{ size: '', stock: '' }]);

    const handleBobChange = (e) => {
        const { name, value } = e.target;
        setBobData(prev => ({ ...prev, [name]: value }));
    };

    const handleSizeChange = (index, e) => {
        const newSizes = sizes.map((size, i) => {
            if (index === i) {
                return { ...size, [e.target.name]: e.target.value };
            }
            return size;
        });
        setSizes(newSizes);
    };

    const addSize = () => {
        setSizes([...sizes, { size: '', stock: '' }]);
    };

    return (
        <div className="flex justify-center">
            <form className="space-y-4 w-full max-w-md" onSubmit={e => e.preventDefault()}>
                <div className="flex flex-col">
                    <label>Title</label>
                    <input type="text" name="title" value={bobData.title} onChange={handleBobChange} className="border p-1 rounded" />
                </div>
                <div className="flex flex-col">
                    <label>Description</label>
                    <textarea name="description" value={bobData.description} onChange={handleBobChange} className="border p-1 rounded" />
                </div>
                <div className="flex flex-col">
                    <label>Price</label>
                    <input type="number" name="price" value={bobData.price} onChange={handleBobChange} className="border p-1 rounded" />
                </div>
                <div className="flex flex-col">
                    <label>Stripe Price ID</label>
                    <input type="text" name="priceIdStripe" value={bobData.priceIdStripe} onChange={handleBobChange} className="border p-1 rounded" />
                </div>
                <div className="flex flex-col">
                    <label>Image</label>
                    <input type="file" onChange={e => setBobData({ ...bobData, image: e.target.files[0] })} className="border p-1 rounded" />
                </div>
                <div className="flex flex-col">
                    <label>Sizes and Stock</label>
                    {sizes.map((size, index) => (
                        <div key={index} className="flex space-x-2">
                            <input type="text" name="size" value={size.size} onChange={e => handleSizeChange(index, e)} placeholder="Size" className="border p-1 rounded" />
                            <input type="number" name="stock" value={size.stock} onChange={e => handleSizeChange(index, e)} placeholder="Stock" className="border p-1 rounded" />
                        </div>
                    ))}
                    <button type="button" onClick={addSize} className="mt-2 text-sm bg-blue-500 text-white p-1 rounded hover:bg-blue-600">Add Size</button>
                </div>
                <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">Save Bob</button>
            </form>
        </div>
    );
}
