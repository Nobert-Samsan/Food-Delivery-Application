import React, { useState, useEffect ,useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Orders.css';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders =useCallback( async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
    } finally {
      setLoading(false);
    }
  }, [url]);

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error("Failed to update order status");
      }
    } catch (error) {
      toast.error("Error updating order status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order) => (
  <div key={order._id} className="order-item">
    <img src={assets.parcel_icon} alt="Parcel Icon" />
    <div>
      <p className="order-item-food">
        {order.items.map((item, index) => (
          <span key={index}>
            {item.name} x {item.quantity}
            {index < order.items.length - 1 ? ', ' : ''}
          </span>
        ))}
      </p>
      <p className='order-item-name'>
        {order.address.firstName} {order.address.lastName}
      </p>
      <div className="order-item-address">
        <p>{order.address.street},</p>
        <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
      </div>
      <p className="order-item-phone">
        {order.address.phone}
      </p>
    </div>
    <p>Items: {order.items.length}</p>
    <p>${order.amount}</p>
    <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
      <option value="Food Processing">Food Processing</option>
      <option value="Out for delivery">Out for delivery</option>
      <option value="Delivered">Delivered</option>
    </select>
  </div>
))}

      </div>
    </div>
  );
};

export default Orders;
