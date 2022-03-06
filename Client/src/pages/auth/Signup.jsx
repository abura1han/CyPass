import React, { useState } from "react";
import "../../styles/Login.css";
import appConfig from "../../config";
import { Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState([]);

  function signup() {
    if (name && email && password && address) {
      fetch(`${appConfig.serverUrl}api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: name.trim(),
          Email: email,
          Password: password,
          Address: address.trim(),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.success) {
            console.log(data);
            setErrMsg(data.errors);
            return;
          }

          setSuccessMsg("Account creation successful");

          setTimeout(() => {
            // Redirect to admin page
            window.location = "/login";
          }, 2000);
        });
    }
  }

  return (
    <div className="login">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signup();
        }}
      >
        <h2>Signup</h2>
        <div>
          {errMsg &&
            errMsg.map((err, index) => (
              <input
                key={index}
                className="error"
                type="text"
                readOnly
                value={err.msg}
              />
            ))}
          {successMsg && (
            <input
              className="success"
              type="text"
              readOnly
              value={successMsg}
            />
          )}
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value.trim())}
            value={email}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            required
          />
        </div>
        <div>
          <button type="submit">Signup</button>
        </div>
        <div>
          <Link to="/login">Login here</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
