import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import StarRating from "./Reateing";

function CartList() {
  document.title = "Shopping Cart";
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState({});
  const cartProducts = JSON.parse(localStorage.getItem("cartList")) || [];
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contry, setContry] = useState("");

  let orderId = 1;
  const pay = () => {
    orderId = orderId + 1;
    const dataToPost = {
      token: "YOUR_MAKTAPP_TOKEN",
      "FcmToken ": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      currencyCode: "USD",
      orderId: orderId,
      amount: Math.round(totalPrice),
      customerEmail: email,
      customerName: name,
      customerPhone: phone,
      customerCountry: contry,
      lang: "ar",
      note: "",
    };

    if (email && name && phone && contry) {
      fetch("https://maktapp.credit/v3/AddTransaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToPost),
      })
        .then(
          Swal.fire({
            title: "Redirecting To Payment Page",
            didOpen: () => {
              Swal.showLoading();
            },
          })
        )
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          window.location.href = res.result;
        })
        .catch((error) => {
          alert("error: " + error);
        });
    } else {
      Swal.fire({
        text: "All fields must be filled out",
        icon: "error",
        timer: 1800,
        timerProgressBar: true,
      });
    }
  };

  const calculateTotal = (products) => {
    let total = 0;
    products.forEach((product, index) => {
      total += Number(product.price) * (quantity[index] || 1);
    });
    return Number(total.toFixed(2));
  };

  useEffect(() => {
    setTotalPrice(calculateTotal(cartProducts));
  }, [quantity, cartProducts]);

  const add = (index) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [index]: (prevQuantity[index] || 1) + 1,
    }));
  };

  const mins = (index) => {
    setQuantity((prevQuantity) => {
      const newQuantity = { ...prevQuantity };
      if (newQuantity[index] && newQuantity[index] > 1) {
        newQuantity[index] -= 1;
      } else {
        Swal.fire({
          icon: "warning",
          text: "This Is The Minimum Quantity You Can Add!",
          timer: 2000,
          timerProgressBar: true,
        });
      }
      return newQuantity;
    });
  };

  const deleteItem = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't To Delete This Product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your Product has been deleted.",
          icon: "success",
        });

        const updatedCart = [...cartProducts];
        updatedCart.splice(index, 1);

        localStorage.setItem("cartList", JSON.stringify(updatedCart));

        setQuantity((prevQuantity) => {
          const newQuantity = { ...prevQuantity };
          delete newQuantity[index];
          return newQuantity;
        });

        setTotalPrice(calculateTotal(updatedCart));
      }
    });
  };

  return (
    <>
      <h2>Shopping Cart</h2>
      <div className="parent">
        {cartProducts.length > 0 ? (
          <>
          <div className="checkOut">
            <div className="data">
              <div className="form">
                <input
                  type="email"
                  placeholder="Enter Email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.currentTarget.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.currentTarget.value);
                  }}
                />
                <input
                  type="number"
                  placeholder="Enter Your Number"
                  required
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.currentTarget.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Enter Your countrey"
                  required
                  value={contry}
                  onChange={(e) => {
                    setContry(e.currentTarget.value);
                  }}
                />
              </div>
              <div className="foot">
                <p className="total_price">Total : {totalPrice} $</p>
                <button onClick={pay}>CheckOut Now!</button>
              </div>
            </div>
          </div>
          <div className="purshe">
          <div className="form">
            <input
              type="email"
              placeholder="Enter Email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
            />
            <input
              type="text"
              placeholder="Enter Your Name"
              required
              value={name}
              onChange={(e) => {
                setName(e.currentTarget.value);
              }}
            />
            <input
              type="number"
              placeholder="Enter Your Number"
              required
              value={phone}
              onChange={(e) => {
                setPhone(e.currentTarget.value);
              }}
            />
            <input
              type="text"
              placeholder="Enter Your countrey"
              required
              value={contry}
              onChange={(e) => {
                setContry(e.currentTarget.value);
              }}
            />
          </div>
          <div className="foot">
            <p className="total_price">Total : {totalPrice} $</p>
            <button onClick={pay}>CheckOut Now!</button>
          </div>
        </div>
          </>
        ) : (
          ""
        )}
        <div className="card_info">
          {cartProducts.length > 0
            ? cartProducts.map((product, index) => {
                return (
                  <div className="card" key={index}>
                    <div className="image">
                      <img src={product.image} alt="productImage" />
                    </div>
                    <div className="info">
                      <div className="heading">
                        <h2 className="title">{product.title}</h2>
                        <p className="description">{product.description}</p>
                      </div>
                      <div className="controlls">
                        <div className="price_section">
                          <span className="price">{product.price} $</span>
                        </div>
                        <h3>Quantity : {quantity[index] || 1}</h3>
                        <div className="counter">
                          <div className="buttons">
                            <button onClick={() => add(index)} style={{ margin: "15px 10px" }}>
                              +
                            </button>
                            <button onClick={() => mins(index)} style={{ margin: "15px 10px" }}>
                              -
                            </button>
                          </div>
                        </div>
                        <svg onClick={() => deleteItem(index)} style={{ margin: "20px 0" }} xmlns="http://www.w3.org/2000/svg" height="28" width="25" fill="red" viewBox="0 0 448 512">
                          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })
            : "No products in the cart"}
        </div>
    
      </div>
    </>
  );
}

export default CartList;
