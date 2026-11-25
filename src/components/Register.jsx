import React, { useState } from "react";
import Swal from "sweetalert2";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [phone, setPhone] = useState("");

  const users = [];

  const user_register = () => {
    if (email !== "" && username !== "" && password !== "" && firstName !== "" && lastName !== "" && city !== "" && street !== "" && phone !== "") {
      let newUser = {
        email: email,
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        city: city,
        street: street + ", " + city,
        phone: phone,
      };
      users.push(newUser);
      setEmail("");
      setUsername("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setCity("");
      setStreet("");
      setPhone("");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields!",
      });
    }
    console.log(users);
  };
  return (
    <>
      <h2>Create Acount</h2>
      <div className="form">
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="UserName"
          value={username}
          onChange={(e) => {
            setUsername(e.currentTarget.value);
          }}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => {
            setCity(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="Street"
          value={street}
          onChange={(e) => {
            setStreet(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => {
            setPhone(e.currentTarget.value);
          }}
        />
        <button onClick={user_register}>Register</button>
      </div>
    </>
  );
}
export default Register;
