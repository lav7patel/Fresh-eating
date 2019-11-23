import React, { useState } from "react";
import API from "../utils/API.js";
import { Link } from "react-router-dom";

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
          props.history.push("/");
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
    <>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form className="login100-form validate-form">
              <span className="login100-form-title p-b-26">Welcome</span>
              <span className="login100-form-title p-b-48">
                <i className="zmdi zmdi-font"></i>
              </span>

              <div
                className="wrap-input100 validate-input"
                data-validate="Valid email is: a@b.c"
              >
                <input
                  className="input100"
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleChange}
                />
                <span
                  className="focus-input100"
                  data-placeholder="Email"
                ></span>
              </div>

              <div
                className="wrap-input100 validate-input"
                data-validate="Enter password"
              >
                <span className="btn-show-pass">
                  <i className="zmdi zmdi-eye"></i>
                </span>
                <input
                  className="input100"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />

                <span
                  className="focus-input100"
                  data-placeholder="Password"
                ></span>
              </div>

              {loginPage ? null : (
                <div
                  className="wrap-input100 validate-input"
                  data-validate="Enter password"
                >
                  <span className="btn-show-pass">
                    <i className="zmdi zmdi-eye"></i>
                  </span>
                  <input
                    className="input100"
                    type="password"
                    name="password2"
                    value={password2}
                    onChange={handleChange}
                  />

                  <span
                    className="focus-input100"
                    data-placeholder="Password"
                  ></span>
                </div>
              )}

              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button onClick={handleSubmit} className="login100-form-btn">
                    Submit
                  </button>
                </div>
              </div>

              <div className="text-center p-t-115">
                <span className="txt1">Don’t have an account?</span>

                <Link onClick={switchPage} className="txt2">
                  signup
                </Link>

                {/* <a className="txt2" href="#">
                  Sign Up
                </a> */}
              </div>
            </form>
          </div>
        </div>
      </div>

      <div id="dropDownSelect1"></div>
    </>
  );
}

export default Login;
