import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { love, get_form_localStorage } from "./controller/Love_products";
import Header from "./Header";
import StarRating from "./Reateing";
import Swal from "sweetalert2";
function AllProducts() {
  const [products, setProducts] = useState([]);
  const [endPoint, setEndPoint] = useState("https://fakestoreapi.com/products");
  const [responseStatus, setResponseStatus] = useState("faild");

  const getProducts = async () => {
    try {
      const response = await fetch(endPoint);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
      setResponseStatus("done");
    } catch (error) {
      setResponseStatus("faild");
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [endPoint]);

  // ********** Cart List ***********
  const [cartList, setCartList] = useState(() => {
    const storedCart = localStorage.getItem("cartList");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [cartCount, setCartCount] = useState(cartList.length >= 1 ? cartList.length : 0);
  const addToCart = (productID) => {
    const selectedProduct = products.find((product) => product.id === productID);
    if (selectedProduct && !cartList.some((item) => item.id === selectedProduct.id)) {
      setCartList((prevCartList) => [...prevCartList, selectedProduct]);
      Swal.fire({
        icon:"success",
        text: "Added To Cart",
        timer: 1800,
        timerProgressBar: true,
      })
    } else {
      Swal.fire({
        icon:"warning",
        text: "Already In Cart",
        timer: 1800,
        timerProgressBar: true,
      });
    }
  };

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartList));
    setCartCount(cartList.length);
  }, [cartList]);
  useEffect(() => {
    let storedCart = localStorage.getItem("cartList");
    if (storedCart) {
      setCartList(JSON.parse(storedCart));
    }
  }, []);
  // ****************************************

  get_form_localStorage();

  
//  ********************* sort data from ***********************
  function category(id) {
    setEndPoint(`https://fakestoreapi.com/products/category/${id}`);
  }
// ***************************************************************

  return (
    <>
      <Header cartCount={cartCount} />

      <div className="category">
        <div>
          <input onClick={() => setEndPoint("https://fakestoreapi.com/products")} type="radio" name="category" id="All" />
          <label htmlFor="All">All</label>
        </div>
        <div>
          <input onClick={() => category("electronics")} type="radio" name="category" id="electronics" />
          <label htmlFor="electronics">Electronics</label>
        </div>
        <div>
          <input onClick={() => category("jewelery")} type="radio" name="category" id="jewelery" />
          <label htmlFor="jewelery">jewelery</label>
        </div>
        <div>
          <input onClick={() => category("men's clothing")} type="radio" name="category" id="men's_clothin" />
          <label htmlFor="men's_clothin">Men's Clothin</label>
        </div>
        <div>
          <input onClick={() => category("women's clothing")} type="radio" name="category" id="women's_clothing" />
          <label htmlFor="women's_clothing">Women's Clothing</label>
        </div>
      </div>
      <div className="container">
        {responseStatus === "done" ? (
          products.map((product, index) => {
            return (
              <div className="card" key={index}>
                <div className="image">
                  <img src={product.image} alt="productImage" />
                </div>
                <h2 className="title">{product.title}</h2>
                <div className="category">{product.category}</div>
                <div className="price">{product.price} $</div>
                <div className="count">count: {product.rating.count}</div>
                <StarRating rating={product.rating.rate} />
                <svg onClick={() => love("love" + product.id)} id={"love" + product.id} xmlns="http://www.w3.org/2000/svg" height="25" width="25" fill="#ccc" viewBox="0 0 512 512">
                  <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                </svg>
                <button onClick={() => addToCart(product.id)}>Add To Cart</button>
              </div>
            );
          })
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}

export default AllProducts;
