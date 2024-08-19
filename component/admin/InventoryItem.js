"use client";

import updateBob from "@/actions/stocks";
import { useState } from "react";
//import { addSizeToBob, removeSizeFromBob, updateSize } from "@/lib/shopping";
import { removeSizeAction } from "@/actions/stocks";


export default function InventoryItem({ bob, onDeleteBob, onDeleteSize }) {
    const [sizes, setSizes] = useState(bob.sizes);

    const handleSizeChange = async (index, field, value) => {
        let newSizes = [...sizes];
        newSizes[index] = { ...newSizes[index], [field]: value };
        setSizes(newSizes);
    };

    const addSize = async () => {
        const newSize = { size: '', stock: 0 };
        setSizes([...sizes, newSize]);
    };

    const removeSize = async (index) => {
        const sizeId = sizes[index].id;
        setSizes(sizes.filter((_, i) => i !== index));
    };

    return (
        <div className="bg-white p-4 rounded shadow mb-4">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{bob.title}</h3>
                <button onClick={() => onDeleteBob(bob.id)} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700">
                    Delete Bob
                </button>
            </div>
            <div className="mt-2">
                {sizes.map((size, index) => (
                    <form action={updateBob} key={index} className="flex items-center mb-2">
                        <input
                            type="hidden"
                            name="bobId"
                            value={bob.id}  // Assuming bob.id is accessible and contains the ID of the bob
                        />
                        <input
                            type="text"
                            value={size.size}
                            onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                            placeholder="Size"
                            name="size"
                            className="border p-1 rounded mr-2"
                        />
                        <input
                            type="number"
                            value={size.stock}
                            onChange={(e) => handleSizeChange(index, 'stock', parseInt(e.target.value, 10))}
                            placeholder="Stock"
                            name="stock"
                            className="border p-1 rounded"
                        />
                        <button formAction={removeSizeAction} className="ml-2 bg-red-500 text-white p-1 rounded hover:bg-red-700">
                            Remove
                        </button> 
                        <button type="submit" className="ml-2 bg-green-500 text-white p-1 rounded hover:bg-green-700">
                            Save
                        </button>
                    </form>
                ))}
                <button onClick={addSize} className="text-sm bg-blue-500 text-white p-1 rounded hover:bg-blue-600">Add Size</button>
            </div>
        </div>
    );
}
