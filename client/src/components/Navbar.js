import React, { useState, useEffect } from "react";
import Search  from './Search';
function Navbar(props) {
  return (
        <div className="navbar">
          <a href="/">Search</a>
          <a href="/favorites"><i class="fa fa-star"></i>Favorites</a>
        </div>
    );
  
  //<div> Navbar </div>;
}

export default Navbar;
