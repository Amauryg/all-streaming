import React from "react";
import { NavLink } from "react-router-dom";
import logo from '../logo.png';

const Navbar = () => {
  return (
  	<nav className="navbar navbar-expand-lg bg-light">
  	  <div className="container">
  	    <NavLink className="navbar-brand" to="/">
		  <img src={logo} />
		</NavLink>
  	    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
  	      <span className="navbar-toggler-icon"></span>
  	    </button>
  	    <div className="collapse navbar-collapse" id="navbarNav">
  	      <ul className="navbar-nav">
  	        <li className="nav-item">
  	          <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}  aria-current="page" to="/accounts">Accounts</NavLink>
  	        </li>
  	        <li className="nav-item">
  	          <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to="/services">Services</NavLink>
  	        </li>
  	      </ul>
  	    </div>
  	  </div>
  	</nav>
  )
}

export default Navbar;