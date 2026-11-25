import "./App.css";
import AllProducts from "./components/AllProducts";
import Register from "./components/Register";
import CartList from "./components/CartList";
import CheckOut from './components/CheckOut'
import Notfound from './components/Notfound'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App({ cartCount }) {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AllProducts />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cartList" element={<CartList />} />
          <Route path="/checkOut" element={<CheckOut />} />
          <Route path="/*" element={<Notfound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
