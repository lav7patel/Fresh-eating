import React, { useState, useEffect } from "react";
import API from "../utils/API.js";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [loginPage, setLoginPage] = useState(true);

  const handleChange = event => {
    if (event.target.name === "username") {
      setUsername(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    } else if (event.target.name === "password2")
      setPassword2(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (loginPage) {
      const userObject = {
        username: username,
        password: password
      };
      API.login(userObject)
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
    } else {
      const newUserObject = {
        username: username,
        password: password,
        password2: password2
      };
      API.registerUser(newUserObject)
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
    }
  };

  const switchPage = () => {
    if (loginPage) {
      setLoginPage(false);
    } else {
      setLoginPage(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={handleChange}
          name="username"
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={handleChange}
          name="password"
        />
      </label>
      {loginPage ? null : (
        <label>
          Repeat Password
          <input
            type="password"
            value={password2}
            onChange={handleChange}
            name="password2"
          />
        </label>
      )}
      <input type="submit" value="Submit" />
      <button onClick={switchPage}>
        {loginPage ? "Signup" : "Login Page"}
      </button>
    </form>
  );
}

export default Login;
