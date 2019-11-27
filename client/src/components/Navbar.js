import React from "react";

function Navbar(props) {
  return (
     /*This is the navbar with 3 elements*/ 
  <div className="topnav">
      <a href="/favorites"><i class="fa fa-heart"></i>Favorites</a>
      <a href="/login">Login</a>
      <a href="/">Search</a>
  </div>
  );
  }


export default Navbar;




