import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';
import '../styles/orderPage.css';
import DataTable from 'react-data-table-component';

const OrderComponent = () => {
    const token = localStorage.getItem('authToken');
    const[orderList, setOrderList] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8000/api/orders', {
                headers: {
                    Authorization: `Bearer ${token}`
                  }
            });
            setOrderList(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [token]);

      const columns = [
        {
            name: 'Product Id',
            selector: row => row.product_id,
            sortable: true,
        },
        {
            name: 'Product Name',
            selector: row => row.product_name,
            sortable: true,
        },
        {
            name: 'Quantity',
            selector: row => row.quantity,
            sortable: true,
        },
        {
            name: 'Update',
            selector: row => row.update,
        },
        {
            name: 'Delete',
            selector: row => row.delete,
        },
    ];
    

    return (
        <div className="wrapper-order">
            <div className="order-container">
            <div className="create-link">
                <a href="/create-order">Create</a>
            </div>
            <h1>Order List</h1>
            <DataTable
			columns={columns}
			data={orderList.map(order => ({
                product_id: order.product_id,
                product_name: order.product_name,
                quantity: order.quantity,
                update: <button className="action-btn">Update</button>,
                delete: <button className="action-btn">Delete</button>
            }))}
            pagination
            
		/>

            </div>
        </div>
    );
}

export default OrderComponent;