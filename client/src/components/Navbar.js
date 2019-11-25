import React, { useState, useEffect } from "react";
import API from "../utils/API";

function Navbar(props) {
  const [username, setUsername] = useState("");

  // sets the username into state
  useEffect(() => {
    API.getUser()
      .then(res => {
        console.log(res);
        setUsername(res.data.username);
      })
      .catch(err => console.log(err));
  }, []);
  // for first login sends username as a prop
  useEffect(() => {
    setUsername(props.username);
  }, [props]);

  // logout function
  const logout = () => {
    API.logout()
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };
  return (

    <div className="topnav">
      {/* show username and logout button if logged in
      show login button if not logged in */}
      {username ? (
        <>
          {username}
          <button onClick={logout}>logout</button>
        </>
      ) : (
        <a href="/login">Login</a>
      )}

      <a href="/favorites">
        <i className="fa fa-heart"></i>Favorites
      </a>
      <a href="/">Search</a>
    </div>
  );
}

export default Navbar;
