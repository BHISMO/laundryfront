import React, { Component } from "react";
import { baseUrl } from "../config";
import axios from "axios";

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      jumlahMember: 0,
      jumlahPaket: 0,
      jumlahUser: 0,
    };

    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  }

  getSummary() {
    let endpoint = `${baseUrl}/member`;
    axios
      .get(endpoint)
      .then()
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="container">
        <h1>Home</h1>
        <br />
        <div className="row">
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Jumlah Member</h5>
                <br />
                <h2>90</h2>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Jumlah User</h5>
                <br />
                <h2>3</h2>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Jumlah Paket</h5>
                <br />
                <h2>12</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
