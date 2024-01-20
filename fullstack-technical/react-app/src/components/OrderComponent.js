import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';
import '../styles/orderPage.css';
import DataTable from 'react-data-table-component';
import Modal from 'react-modal';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';



const OrderComponent = () => {
    const token = localStorage.getItem('authToken');
    const[orderList, setOrderList] = useState([]);
    const[id, setId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [open, setOpen] = useState(true);
    const [alert, setAlert] = useState({
    message: 'Welcome User',
    severity: 'success'
    });
    const openModal = (orderid) => {
        setId(orderid);
        console.log(orderid);
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setId(null);
        setIsModalOpen(false);
      };
      const handleConfirm = async () => {
        try {
          const response = await axios.delete(`http://localhost:8000/api/orders/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
              }
          });
          const data = response.data;
          console.log(data);
          setOpen(true);
          setAlert({message: "Deleted Successfully", severity: "success"});
        } catch (error) {
        setOpen(true);
        setAlert({message: "Error Occured", severity: "error"});
          console.error('Error during login:', error);
        } finally {
            closeModal();
          }
      };
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
            <DataTable
			columns={columns}
			data={orderList.map(order => ({
                product_id: <div className="update-link"><a href={`/view-order/${order.id}`}>{order.product_id}</a></div>,
                product_name: <div className="update-link"><a href={`/view-order/${order.id}`}>{order.product_name}</a></div>,
                quantity: <div className="update-link"><a href={`/view-order/${order.id}`}>{order.quantity}</a></div>,
                update:<div className="update-link"><a href={`/update-order/${order.id}`}>Update</a></div>,
                delete: <button className="action-btn" onClick={() => openModal(order.id)}>Delete</button>
            }))}
            pagination
            ariaHideApp={false}
		/>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="custom-modal"
                contentLabel="Confirmation Prompt"
            >
                <h2>Are you sure?</h2>
                <p>This action cannot be undone.</p>
                <br></br>
                <button onClick={handleConfirm} className="action-btn">Confirm</button>
                <button onClick={closeModal} className="action-btn">Cancel</button>
            </Modal>
            </div>
        </div>
    );
}

export default OrderComponent;