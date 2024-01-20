import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';
import '../styles/updateOrderPage.css';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
const UpdateOrderComponent = () => {
    const { id } = useParams();
    console.log(id);
    const token = localStorage.getItem('authToken');
    const[productList, setProductList] = useState([]);
    const[updateOrder, setUpdateOrder] = useState({
        product_id: '',
        quantity: ''
    });
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({
      message: '',
      severity: ''
    });
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
        setUpdateOrder({ ...updateOrder, [e.target.name]: e.target.value });
    }
    const handleUpdateOrder = async () => {
        try {
            setLoading(true);

          const response = await axios.put(`http://localhost:8000/api/orders/${id}`, updateOrder, {
            headers: {
                Authorization: `Bearer ${token}`
              }
          });
          const data = response.data;
          console.log(data);
          setOpen(true);
          setAlert({message: "Successfully Updated", severity: "success"});
        } catch (error) {
          setOpen(true);
          setAlert({message: "Update Error", severity: "error"});
          console.error('Error during login:', error);
        } finally {
            setLoading(false);
            setUpdateOrder({product_id: '', quantity: ''});
          }
      };

    return (
        <div className="wrapper">
            <div className="update-order-container">
                <div className="back-link">
                    <a href="/order">Back</a>
                </div>
                <Box sx={{ width: '100%' }}>
                  <Collapse in={open}>
                    <Alert severity={alert.severity}
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setOpen(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                      sx={{ mb: 2 }}
                    >
                      {alert.message}
                    </Alert>
                  </Collapse>
                </Box>
                <h1>Update Order</h1>
                <form>
                <div className="input-box">
                    <select name="product_id" onChange={handleInputChange} value={updateOrder.product_id}>
                            <option value="">Select Product</option>
                        {productList.map((product) =>
                            <option key={product.id} value={product.id}>{product.name}</option>
                        )}
                    </select>
                </div>
                <div className="input-box">
                    <input type="number" name="quantity" placeholder="Quantity" onChange={handleInputChange} value={updateOrder.quantity} required/>
                </div>
                <button type="button" className="updateOrder-btn" onClick={handleUpdateOrder}>
                {loading ? 'Update Order...' : ' Update Order'}
            </button>
            </form>
          </div>
        </div>
    );
}

export default UpdateOrderComponent;