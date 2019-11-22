import React from "react";

function Navbar(props) {
  return (
    <div className="topnav">
      <a href="/favorites">
        <i class="fa fa-star"></i>Favorites
      </a>
      <a href="/login">Login</a>
      <a href="/">Search</a>
    </div>
  );

  //<div> Navbar </div>;
}

export default Navbar;
