import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';
import '../styles/createOrderPage.css';
const CreateOrderComponent = () => {
    const token = localStorage.getItem('authToken');
    const[productList, setProductList] = useState([]);
    const[order, setOrder] = useState({
        product_id: '',
        quantity: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          try {

            const response = await axios.get('http://localhost:8000/api/products', {
                headers: {
                    Authorization: `Bearer ${token}`
                  }
            });
            setProductList(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          } 
        };
    
        fetchData();
      }, [token]);
    const handleInputChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value });
    }
    const handleCreateOrder = async () => {
        try {
            setLoading(true);

          const response = await axios.post('http://localhost:8000/api/orders', order, {
            headers: {
                Authorization: `Bearer ${token}`
              }
          });
          const data = response.data;
          console.log(data);
        } catch (error) {
          console.error('Error during login:', error);
        } finally {
            setLoading(false);
            setOrder({product_id: '', quantity: ''});
          }
      };

    return (
        <div className="wrapper">
            <div className="create-order-container">
                <div className="back-link">
                    <a href="/order">Back</a>
                </div>
                <h1>Create Order</h1>
                <form>
                <div className="input-box">
                    <select name="product_id" onChange={handleInputChange} value={setOrder.product_id}>
                            <option value="">Select Product</option>
                        {productList.map((product) =>
                            <option key={product.id} value={product.id}>{product.name}</option>
                        )}
                    </select>
                </div>
                <div className="input-box">
                    <input type="number" name="quantity" placeholder="Quantity" onChange={handleInputChange} value={setOrder.quantity} required/>
                </div>
                <button type="button" className="createOrder-btn" onClick={handleCreateOrder}>
                {loading ? 'Creating Order...' : 'Create Order'}
            </button>
            </form>
          </div>
        </div>
    );
}

export default CreateOrderComponent;