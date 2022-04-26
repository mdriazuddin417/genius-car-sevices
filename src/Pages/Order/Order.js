import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import axiosPrivate from "../../api/axiosPrivate";
import auth from "../../firebase.init";

const Order = () => {
  const [user] = useAuthState(auth);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      console.log(user);
      const email = user?.email || user?.providerData[0]?.email;
      const url = `https://young-coast-37816.herokuapp.com/order?email=${email}`;
      try {
        const { data } = await axiosPrivate.get(url);
        console.log(data);
        setOrders(data);
      } catch (error) {
        console.log(error.message);
        if (error.response.status === 403 || error.response.status === 401) {
          signOut(auth);
          navigate("/login");
        }
      }
    };
    getOrders();
  }, [user]);
  console.log(orders);
  return (
    <div>
      <h2>Your Orders:{orders?.length}</h2>
    </div>
  );
};

export default Order;
