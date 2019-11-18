import React, { useState, useEffect } from "react";
import Search  from './Search';
function Navbar(props) {
  return (
        <div className="topnav">
          <a href="/favorites"><i class="fa fa-star"></i>Favorites</a>
          <a href="/">Search</a>
            
        </div>
    );
  
  //<div> Navbar </div>;
}

export default Navbar;
