import React from "react";
import "./App.css";
import Member from "./pages/Member";
import Paket from "./pages/Paket";
import User from "./pages/User";
import Navbar from "./components/Navbar";
import FormTransaksi from "./pages/FormTransaksi";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Transaksi from "./pages/Transaksi";

export default function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <br />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/member" element={<Member />} />
        <Route path="/paket" element={<Paket />} />
        <Route path="/user" element={<User />} />
        <Route path="/transaksi" element={<Transaksi />} />
        <Route path="/form_transaksi" element={<FormTransaksi />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}
