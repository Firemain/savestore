import React from 'react';

const OrderHistory = ({ orders }) => {
    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-4">Order History</h2>
            <div className="space-y-4">
                {orders.map((order, index) => (
                    <div key={index} className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                        <p><strong>Date:</strong> {order.order_date}</p>
                        <p><strong>Buyer:</strong> {order.buyer_name} ({order.buyer_email})</p>
                        <p><strong>Delivery Address:</strong> {order.delivery_address}</p>
                        <p><strong>Total Price:</strong> ${order.total_price.toFixed(2)}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                        <details className="mt-2">
                            <summary className="font-semibold">See Order Contents</summary>
                            <ul>
                                {order.contents && JSON.parse(order.contents).map((item, idx) => (
                                    <li key={idx}>
                                        Product ID: {item.bob_id} - Quantity: {item.quantity}
                                    </li>
                                ))}
                            </ul>
                        </details>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;
