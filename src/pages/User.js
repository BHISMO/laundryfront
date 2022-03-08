import React, { Component } from "react";
import { Modal } from "bootstrap";
import UserCard from "../components/UserCard";
import axios from "axios";

export default class User extends Component {
  constructor() {
    super();
    this.state = {
      id_user: "",
      nama: "",
      username: "",
      password: "",
      role: "",
      action: "",

      users: [],
    };
  }

  getData() {
    let endpoint = "http://localhost:8000/api/users";
    axios
      .get(endpoint)
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getData();
  }

  simpanData(event) {
    event.preventDefault();
    if (this.state.action === "tambah") {
      let endpoint = "http://localhost:8000/api/users";
      let data = {
        nama: this.state.nama,
        username: this.state.username,
        password: this.state.password,
        role: this.state.role,
      };
      // let temp = this.state.members;
      // temp.push(data);
      // this.setState({ members: temp });

      axios
        .post(endpoint, data)
        .then((response) => {
          window.alert(response.data.message);
          this.getData();
        })
        .catch((error) => console.log(error));
      this.modalUser.hide();
    } else if (this.state.action === "ubah") {
      let endpoint = "http://localhost:8000/api/users/" + this.state.id_user;

      let data = {
        nama: this.state.nama,
        username: this.state.username,
        password: this.state.password,
        role: this.state.role,
      };
      axios
        .put(endpoint, data)
        .then((response) => {
          window.alert(response.data.message);
          this.getData();
        })
        .catch((error) => console.log(error));

      // let temp = this.state.members;
      // let index = temp.findIndex(
      //   (member) => member.id_member === this.state.id_member
      // );
      // temp[index].nama = this.state.nama;
      // temp[index].alamat = this.state.alamat;
      // temp[index].jenis_kelamin = this.state.jenis_kelamin;
      // temp[index].telpon = this.state.telpon;

      // this.setState({ members: temp });
      this.modalUser.hide();
    }
  }

  tambahData() {
    this.modalUser = new Modal(document.getElementById("modal_user"));
    this.modalUser.show();

    this.setState({
      nama: "",
      username: "",
      password: "",
      role: "User",
      action: "tambah",
    });
  }

  ubahData(id) {
    this.modalUser = new Modal(document.getElementById("modal_user"));
    this.modalUser.show();

    let index = this.state.users.findIndex((user) => user.id_user === id);

    this.setState({
      id_user: id,
      nama: this.state.users[index].nama,
      username: this.state.users[index].username,
      password: this.state.password,
      role: this.state.users[index].role,
      action: "ubah",
    });
  }

  hapusData(id) {
    if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
      let endpoint = "http://localhost:8000/api/users/" + id;
      axios
        .delete(endpoint)
        .then((response) => {
          window.alert(response.data.message);
          this.getData();
        })
        .catch((error) => console.log(error));
    }
  }

  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-header bg-primary">
            <h3 className="text-white">List User</h3>
          </div>
          <div className="card-body">
            <button
              className="btn btn-secondary btn-md my-1"
              onClick={() => this.tambahData()}
            >
              Tambah data User
            </button>
            <hr />
            <ul className="list-group">
              {this.state.users.map((user) => (
                <li className="list-group-item">
                  <UserCard
                    nama={user.nama}
                    username={user.username}
                    role={user.role}
                    edit={() => this.ubahData(user.id_user)}
                    hapus={() => this.hapusData(user.id_user)}
                  ></UserCard>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Modal */}
        <div className="modal" id="modal_user">
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header bg-primary">
                <h4 className="text-white">Form Data Paket</h4>
              </div>
              <div className="modal-body">
                <form onSubmit={(ev) => this.simpanData(ev)}>
                  Nama
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={this.state.nama}
                    onChange={(ev) => this.setState({ nama: ev.target.value })}
                  />
                  Username
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={this.state.username}
                    onChange={(ev) =>
                      this.setState({ username: ev.target.value })
                    }
                  />
                  Password
                  <input
                    type="password"
                    className="form-control mb-2"
                    value={this.state.password}
                    onChange={(ev) =>
                      this.setState({ password: ev.target.value })
                    }
                  />
                  Role
                  <select
                    className="form-control mb-2"
                    value={this.state.role}
                    onChange={(ev) => this.setState({ role: ev.target.value })}
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                  <button className="btn btn-primary" type="submit">
                    Simpan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Modal */}
      </div>
    );
  }
}
