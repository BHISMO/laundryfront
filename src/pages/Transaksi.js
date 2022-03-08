import axios from "axios";
import React, { Component } from "react";
import { baseUrl } from "../config";

export default class Transaksi extends Component {
  constructor() {
    super();
    this.state = {
      transaksi: [],
    };
  }

  getData() {
    let endpoint = "http://localhost:8000/api/transaksi";
    axios
      .get(endpoint)
      .then((response) => {
        let dataTransaksi = response.data;
        for (let i = 0; i < dataTransaksi.length; i++) {
          let total = 0;
          for (let j = 0; j < dataTransaksi[i].detail_transaksi.length; j++) {
            let harga = dataTransaksi[i].detail_transaksi[j].paket.harga;
            let qty = dataTransaksi[i].detail_transaksi[j].qty;
            total += harga * qty;
          }
          dataTransaksi[i].total = total;
        }
        this.setState({ transaksi: dataTransaksi });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getData();
  }

  deleteTransaksi(id) {
    if (window.confirm("Apakah Anda Yakin ingin menghapus transaksi ini?")) {
      let endpoint = `${baseUrl}/transaksi/${id}`;
      axios
        .delete(endpoint)
        .then((response) => {
          window.alert(response.data.message);
          this.getData();
        })
        .catch((error) => console.log(error));
    }
  }

  changeStatus(id, status) {
    if (
      window.confirm("Apakah anda yakin ingin mengganti status transaksi ini?")
    ) {
      let endpoint = `${baseUrl}/transaksi/status/${id}`;

      let data = {
        status: status,
      };

      axios
        .post(endpoint, data)
        .then((response) => {
          window.alert(`Status Transaksi Telah Diubah`);
          this.getData();
        })
        .catch((error) => console.log(error));
    }
  }

  changeBayar(id) {
    if (
      window.confirm("Apakah anda yakin ingin mengganti status pembayaran ini?")
    ) {
      let endpoint = `${baseUrl}/transaksi/bayar/${id}`;
      console.log(endpoint);
      axios
        .get(endpoint)
        .then((response) => {
          window.alert(`Pembayaran Transaksi Telah Diubah`);
          this.getData();
        })
        .catch((error) => console.log(error));
    }
  }

  convertBayar(id_transaksi, status) {
    if (status === 0) {
      return (
        <div className="badge bg-info">
          Belum Dibayar
          <br />
          <br />
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => this.changeBayar(id_transaksi)}
          >
            Update Status
          </button>
        </div>
      );
    } else if (status === 1) {
      return <div className="badge bg-success">Sudah Dibayar</div>;
    }
  }

  convertStatus(id_transaksi, status) {
    if (status === 1) {
      return (
        <div className="badge bg-info">
          Transaksi Baru
          <br />
          <br />
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => this.changeStatus(id_transaksi, 2)}
          >
            Update Status
          </button>
        </div>
      );
    } else if (status === 2) {
      return (
        <div className="badge bg-warning">
          Sedang diproses
          <br />
          <br />
          <button
            className="btn btn-sm btn-warning"
            onClick={() => this.changeStatus(id_transaksi, 3)}
          >
            Update Status
          </button>
        </div>
      );
    } else if (status === 3) {
      return (
        <div className="badge bg-secondary">
          Siap diambil
          <br />
          <br />
          <button
            className="btn btn-sm btn-warning"
            onClick={() => this.changeStatus(id_transaksi, 4)}
          >
            Update Status
          </button>
        </div>
      );
    } else if (status === 4) {
      return <div className="badge bg-success">Sudah diambil</div>;
    }
  }

  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-header bg-primary">
            <h4 className="text-white">List Transaksi</h4>
          </div>
          <div className="card-body">
            <ul className="list-group">
              {this.state.transaksi.map((trans) => (
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-lg-3">
                      <small className="text-info">Member</small>
                      <br />
                      {trans.member.nama}
                    </div>
                    <div className="col-lg-3">
                      <small className="text-info">
                        Tanggal Transaksi
                        <br />
                      </small>
                      {trans.tgl}
                    </div>
                    <div className="col-lg-3">
                      <small className="text-info">
                        Batas Waktu
                        <br />
                      </small>
                      {trans.batas_waktu}
                    </div>
                    <div className="col-lg-3">
                      <small className="text-info">
                        Tanggal Bayar
                        <br />
                      </small>
                      {trans.tgl_bayar}
                    </div>
                    <div className="col-lg-3">
                      <small className="text-info">
                        Status
                        <br />
                      </small>
                      {this.convertStatus(trans.id_transaksi, trans.status)}
                    </div>
                    <div className="col-lg-3">
                      <small className="text-info">
                        Status Pembayaran
                        <br />
                      </small>
                      {this.convertBayar(trans.id_transaksi, trans.dibayar)}
                    </div>
                    <div className="col-lg-3">
                      <small className="text-info">
                        Total
                        <br />
                      </small>
                      Rp {trans.total}
                    </div>
                    <div className="col-lg-3">
                      <br />
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => this.deleteTransaksi(trans.id_transaksi)}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                  <hr />
                  <h5>Detail Transaksi</h5>
                  {trans.detail_transaksi.map((detail) => (
                    <div className="row">
                      <div className="col-lg-3">
                        <small className="text-info">Nama Paket</small>
                        <br />
                        {detail.paket.jenis_paket}
                      </div>
                      <div className="col-lg-2">
                        <small className="text-info">Qty</small>
                        <br />
                        {detail.qty}
                      </div>
                      <div className="col-lg-3">
                        <small className="text-info">Harga paket</small>
                        <br />
                        @Rp {detail.paket.harga}
                      </div>
                      <div className="col-lg-4">
                        <small className="text-info">Harga Total Paket</small>
                        <br />
                        Rp {detail.paket.harga * detail.qty}
                      </div>
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
