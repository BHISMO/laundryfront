import React, { Component } from "react";
import { Modal } from "bootstrap";
import axios from "axios";

export default class FormTransaksi extends Component {
  constructor() {
    super();
    this.state = {
      id_member: 0,
      tgl: "",
      batas_waktu: "",
      tgl_bayar: "",
      dibayar: 0,
      id_user: "",
      detail_transaksi: [],
      members: [],
      pakets: [],
      id_paket: "",
      qty: 0,
      jenis_paket: "",
      harga: 0,
      action: "",
    };
  }

  getMember() {
    let endpoint = "http://localhost:8000/api/member";
    axios
      .get(endpoint)
      .then((response) => this.setState({ members: response.data }))
      .catch((error) => console.log(error));
  }

  getPaket() {
    let endpoint = "http://localhost:8000/api/paket";
    axios
      .get(endpoint)
      .then((response) => this.setState({ pakets: response.data }))
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getMember();
    this.getPaket();
  }

  tambahPaket(event) {
    event.preventDefault();
    this.modal.hide();
    let idPaket = this.state.id_paket;
    let list_paket = this.state.pakets;
    let selectedPaket = list_paket.find(
      ({ id_paket }) => id_paket === parseInt(idPaket)
    );

    console.log(selectedPaket);
    let newPaket = {
      id_paket: this.state.id_paket,
      qty: this.state.qty,
      jenis_paket: selectedPaket.jenis_paket,
      harga: selectedPaket.harga,
    };

    let temp = this.state.detail_transaksi;
    temp.push(newPaket);
    this.setState({ detail_transaksi: temp });
    console.log(temp);
  }

  addPaket() {
    this.modal = new Modal(document.getElementById("modal_paket"));
    this.modal.show();

    this.setState({
      id_paket: "",
      qty: 0,
      jenis_paket: "",
      harga: 0,
      action: "tambah",
    });
  }

  editPaket() {
    // this.modal = new Modal(document.getElementById("modal_paket"));
    // this.modal.show();

    // this.setState({
    //   id_paket: "",
    //   qty: 0,
    //   jenis_paket: "",
    //   harga: 0,
    //   action: "edit",
    // });
    console.log(this.state.detail_transaksi);
  }

  hapusPaket(id_paket) {
    if (window.confirm("Apakah anda yakin ingin menghapus data ini ?")) {
      //mencari posisi index dari data yang akan dihapus
      console.log(id_paket);
      let temp = this.state.detail_transaksi;
      let index = temp.findIndex((detail) => detail.id_paket === id_paket);

      //menghapus data pada array
      temp.splice(index, 1);

      this.setState({ detail_transaksi: temp });
    }
  }

  simpanTransaksi() {
    let endpoint = "http://localhost:8000/api/transaksi";
    let user = JSON.parse(localStorage.getItem("user"));
    let data = {
      id_member: this.state.id_member,
      tgl: this.state.tgl,
      batas_waktu: this.state.batas_waktu,
      tgl_bayar: this.state.tgl_bayar,
      dibayar: this.state.dibayar,
      id_user: user.id_user,
      detail_transaksi: this.state.detail_transaksi,
    };

    axios
      .post(endpoint, data)
      .then((response) => {
        window.alert(response.data.message);
        this.getData();
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-header bg-primary">
            <h4 className="text-white">Form Transaksi</h4>
          </div>
          <br />
          <div className="card-body">
            Member
            <select
              className="form-control mb-2"
              value={this.state.id_member}
              onChange={(e) => this.setState({ id_member: e.target.value })}
            >
              <option value={0}>Pilih Member</option>
              {this.state.members.map((member) => (
                <option value={member.id_member}>{member.nama}</option>
              ))}
            </select>
            Tanggal Transaksi
            <input
              type="date"
              className="form-control mb-2"
              value={this.state.tgl}
              onChange={(e) => this.setState({ tgl: e.target.value })}
            />
            Batas Waktu
            <input
              type="date"
              className="form-control mb-2"
              value={this.state.batas_waktu}
              onChange={(e) => this.setState({ batas_waktu: e.target.value })}
            />
            Tanggal Bayar
            <input
              type="date"
              className="form-control mb-2"
              value={this.state.tgl_bayar}
              onChange={(e) => this.setState({ tgl_bayar: e.target.value })}
            />
            Status Bayar
            <select
              className="form-control mb-2"
              value={this.state.bayar}
              onChange={(e) => this.setState({ dibayar: e.target.value })}
            >
              <option value={1}>Sudah Dibayar</option>
              <option value={0}>Belum Dibayar</option>
            </select>
            <br />
            <div className="row gap-2">
              <button
                className="btn btn-primary"
                onClick={() => this.simpanTransaksi()}
              >
                Simpan Transaksi
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => this.addPaket()}
              >
                Tambah Paket
              </button>
            </div>
            <hr />
            <h5>Detail Transaksi</h5>
            {this.state.detail_transaksi.map((detail) => (
              <div className="row">
                <div className="col-lg-3">
                  <small className="text-info">Nama Paket</small>
                  <br />
                  {detail.jenis_paket}
                </div>
                <div className="col-lg-1">
                  <small className="text-info">Qty</small>
                  <br />
                  {detail.qty}
                </div>
                <div className="col-lg-3">
                  <small className="text-info">Harga paket</small>
                  <br />
                  Rp {detail.harga}
                </div>
                <div className="col-lg-3">
                  <small className="text-info">Harga Total</small>
                  <br />
                  Rp {detail.harga * detail.qty}
                </div>
                <div className="col-lg-2">
                  <div className="d-grid gap-1">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => this.editPaket()}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => this.hapusPaket(detail.id_paket)}
                    >
                      Hapus
                    </button>
                  </div>
                  <br />
                </div>
              </div>
            ))}
            {/* Modal Paket */}
            <div className="modal" id="modal_paket">
              <div className="modal-dialog modal-md">
                <div className="modal-content">
                  <div className="modal-header bg-danger">
                    <h4 className="text-white">Pilih Paket</h4>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={(ev) => this.tambahPaket(ev)}>
                      Pilih Paket
                      <select
                        className="form-control mb-2"
                        value={this.state.id_paket}
                        onChange={(e) =>
                          this.setState({ id_paket: e.target.value })
                        }
                      >
                        <option value="">Pilih Paket</option>
                        {this.state.pakets.map((paket) => (
                          <option value={paket.id_paket}>
                            {paket.jenis_paket}
                          </option>
                        ))}
                      </select>
                      Jumlah (Qty)
                      <input
                        type="number"
                        className="form-control mb-2"
                        value={this.state.qty}
                        onChange={(e) => this.setState({ qty: e.target.value })}
                      />
                      <button className="btn btn-success" type="submit">
                        Tambah
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
