import React from "react";

function Navbar(props) {
  return (
	  <div className= "seize">
    <input id="burger" type="checkbox" />

<label for="burger">
    <span></span>
    <span></span>
    <span></span>
</label>

<nav>    
  <ul>
    <li><a href="/">Search</a></li>
    <li><a href="/login">Login</a></li>
    <li><a href="/favorites">Favorites</a></li>
  </ul>  
</nav>
</div>
  );
}


export default Navbar;




