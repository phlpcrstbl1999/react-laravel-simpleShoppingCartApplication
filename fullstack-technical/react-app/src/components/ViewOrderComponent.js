import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../styles/viewOrderPage.css';
import { useParams } from 'react-router-dom';

const ViewOrderComponent = () => {
    const { id } = useParams();
    const token = localStorage.getItem('authToken');
    const [orderDetails, setOrderDetails] = useState({
        product_id: '',
        product_name: '',
        quantity: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/orders/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setOrderDetails({
                    product_id: response.data.product_id,
                    product_name: response.data.product_name,
                    quantity: response.data.quantity
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [token, id]);

    console.log(orderDetails);

    return (
        <div className="wrapper">
            <div className="update-order-container">
                <div className="back-link">
                    <a href="/order">Back</a>
                </div>
                <h1>View Order</h1>
                <form>
                    <div className="input-box">
                        <input type="text" name="name" value={orderDetails.product_name} readOnly />
                    </div>
                    <div className="input-box">
                        <input type="number" name="quantity" value={orderDetails.quantity} readOnly />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ViewOrderComponent;