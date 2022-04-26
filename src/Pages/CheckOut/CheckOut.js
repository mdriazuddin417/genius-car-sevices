import React from "react";
import { useParams } from "react-router-dom";
import useServiceDetail from "../../hooks/useServiceDetail";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import axios from "axios";
import { toast } from "react-toastify";

const CheckOut = () => {
  const { serviceId } = useParams();
  const [service] = useServiceDetail(serviceId);
  const [user] = useAuthState(auth);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const order = {
      email: user.email || user?.providerData[0]?.email,
      service: service.name,
      serviceId: serviceId,
      address: e.target.address.value,
      phone: e.target.phone.value,
    };
    axios
      .post("https://young-coast-37816.herokuapp.com/order", order)
      .then((response) => {
        console.log(response);
        const { data } = response;
        if (data.insertedId) {
          toast("Your order is booked !!!");
          e.target.reset();
        }
      });
  };

  // const [user, setUser] = useState({
  //   name: "Akbar is bad",
  //   email: "akbar @gmail.com",
  //   address: "Tajmohol Road ",
  //   phone: "01786552964",
  // });
  // const handleAddressChange = (e) => {
  //   const { address, ...rest } = user;
  //   const newAddress = e.target.value;
  //   const newUser = { address: newAddress, ...rest };
  //   setUser(newUser);
  // };
  return (
    <div className="w-50 mx-auto">
      <h2>Please Order: {service?.displayName}</h2>
      <form onSubmit={handlePlaceOrder}>
        <input
          className="w-100 mb-2"
          type="text"
          name="name"
          value={user?.displayName}
          id=""
          placeholder="name"
          required
          readOnly
          disabled
        />{" "}
        <br />
        <input
          className="w-100 mb-2"
          type="email"
          name="email"
          value={user?.providerData[0]?.email || user?.email}
          id=""
          placeholder="Email"
          required
          readOnly
          disabled
        />{" "}
        <br />
        <input
          className="w-100 mb-2"
          type="text"
          value={service.name}
          readOnly
          name="service"
          id=""
          placeholder="service"
          required
        />{" "}
        <br />
        <input
          className="w-100 mb-2"
          type="text"
          name="address"
          // value={user.address}
          // onChange={handleAddressChange}
          autoComplete="of"
          id=""
          placeholder="address"
          required
        />{" "}
        <br />
        <input
          className="w-100 mb-2"
          type="text"
          name="phone"
          // value={user.phone}
          id=""
          placeholder="phone"
          autoComplete="of"
          required
        />{" "}
        <br />
        <input className=" btn btn-primary" type="submit" value="Place Order" />
      </form>
    </div>
  );
};

export default CheckOut;
