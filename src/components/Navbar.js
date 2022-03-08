import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <h2 className="navbar-brand">Laundry</h2>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/auth" className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/member" className="nav-link">
              Member
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/paket" className="nav-link">
              Paket
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user" className="nav-link">
              User
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/transaksi" className="nav-link">
              Transaksi
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/form_transaksi" className="nav-link">
              Form Transaksi
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
