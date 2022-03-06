import React, { useState } from "react";
import "../../styles/Login.css";
import appConfig from "../../config";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  function login() {
    if (email && password) {
      fetch(`${appConfig.serverUrl}api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: email,
          Password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.success) {
            setErrMsg(data.error);
            return;
          }

          // Set token to cookies
          Cookies.set("access_token", data.access_token);
          Cookies.set("refresh_token", data.refresh_token);

          // Redirect to admin page
          window.location = "/";
        });
    }
  }

  return (
    <div className="login">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        <h2>Login</h2>
        <div>
          {errMsg && (
            <input className="error" type="text" readOnly value={errMsg} />
          )}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value.trim())}
            value={email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        <div>
          <Link to="/signup">Signup here</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
