import { Modal } from "bootstrap";
import React from "react";
import axios from "axios";
import { authorization } from "../config";

class Paket extends React.Component {
  constructor() {
    super();
    this.state = {
      id_paket: "",
      jenis_paket: "",
      harga: 0,
      visible: true,
      pakets: [
        {
          id_paket: "1",
          jenis_paket: "Cuci tok",
          harga: 5000,
        },
        {
          id_paket: "2",
          jenis_paket: "Cuci setrika",
          harga: 7000,
        },
        {
          id_paket: "3",
          jenis_paket: "Setrika tok",
          harga: 3000,
        },
      ],
    };
    if(!localStorage.getItem("token")){
      window.location.href = "/login"
    }
  }
  tambahData() {
    this.modalPaket = new Modal(document.getElementById("modal_paket"));
    this.modalPaket.show();

    this.setState({
      action: "tambah",
      id_paket: Math.random(1, 10000),
      jenis_paket: "",
      harga: 0,
    });
  }
  simpanData(event) {
    event.preventDefault();

    if (this.state.action === "tambah") {
      let endpoint = "http://localhost:8000/paket"
      let data = {
        id_paket: this.state.id_paket,
        jenis_paket: this.state.jenis_paket,
        harga: this.state.harga,
      };
      //tambah ke state paket (arrays)
      // let temp = this.state.pakets;
      // temp.push(data);
      // this.setState({ pakets: temp });

      axios.post(endpoint,data,authorization)
      .then(response => {
        window.alert(response.data.message)
        this.getData()
      })
      .catch(error => console.log(error))
      this.modalPaket.hide();
    } else if (this.state.action === "ubah") {
      // let temp = this.state.pakets;
      // let index = temp.findIndex(
      //   (paket) => paket.id_paket === this.state.id_paket
      // );
      // temp[index].jenis_paket = this.state.jenis_paket;
      // temp[index].harga = this.state.harga;

      // this.setState({ pakets: temp });
      let endpoint = "http://localhost:8000/paket/" + this.state.id_paket
      let data = {
        id_paket: this.state.id_paket,
        jenis_paket: this.state.jenis_paket,
        harga: this.state.harga,
      };

      axios.put(endpoint,data,authorization)
      .then((response) => {
        window.alert(response.data.message)
        this.getData()
      })
      .catch((error) => console.log(error))
      this.modalPaket.hide();
    }
  }
  ubahData(id_paket) {
    this.modalPaket = new Modal(document.getElementById("modal_paket"));
    this.modalPaket.show();

    let index = this.state.pakets.findIndex(
      (paket) => paket.id_paket === id_paket
    );
    this.setState({
      action: "ubah",
      id_paket: id_paket,
      jenis_paket: this.state.pakets[index].jenis_paket,
      alamat: this.state.pakets[index].alamat,
    });
  }
  hapusData(id_paket) {
    if (window.confirm("Apakahanda yakin?")) {
      // posisi index data yang akan dihapus
      // let temp = this.state.pakets;
      // let index = temp.findIndex((paket => paket.id_paket === id_paket));

      // // dihapus data array
      // temp.splice(index, 1);

      // this.setState({ pakets: temp });
      let endpoint = "http://localhost:8000/paket/" + id_paket;

      axios.delete(endpoint,authorization)
      .then((response) =>{
        window.alert(response.data.message)
        this.getData()
      })
      .catch((error) => console.log(error));
    }
  }
  getData(){
    let endpoint = "http://localhost:8000/paket"
    axios.get(endpoint,authorization)
    .then(response => {
      this.setState({pakets: response.data})
    })
    .catch(error => console.log(error))
  }

  componentDidMount(){
    this.getData()
    let user = JSON.parse(localStorage.getItem("user"))
    if(user.role === 'admin'){
      this.setState({
        visible:true
      })
    }else{
      this.setState({
        visible:false
      })
    }
  }
  render() {
    return (
      <div className="container">
        <p></p>
        <div className="card">
          <div className="card-header bg-dark">
            <h3 className="text-warning text-center">List Paket</h3>
          </div>
          <div className="card-body">
            <ul className="list-group">
              {this.state.pakets.map((paket) => (
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-lg-5">
                      <small className="text-white fw-bold badge bg-dark text-wrap">Jenis Paket</small>
                      <br></br>
                      <h6>{paket.jenis_paket}</h6>
                    </div>
                    <div className="col-lg-5">
                      <small className="text-white fw-bold badge bg-dark text-wrap">Harga</small>
                      <br></br>
                      <h6>Rp {paket.harga}</h6>
                    </div>
                    <div className="col-lg-2 justify-content-center align-self-center">
                      <div>
                        <button
                          className={`btn btn-sm btn-dark text-warning mx-2 ${this.state.visible ? `` : `d-none`}`}
                          onClick={() => this.ubahData(paket.id_paket)}
                        >
                          Edit
                        </button>
                        <button
                          className={`btn btn-sm btn-danger mx-2 ${this.state.visible ? `` : `d-none`}`}
                          onClick={() => this.hapusData(paket.id_paket)}
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button
              className={`btn btn-sm btn-dark my-3 text-warning ${this.state.visible ? `` : `d-none`}`}
              onClick={() => this.tambahData()}
            >
              Tambah data Paket
            </button>
          </div>
        </div>

        {/* form modal data paket */}
        <div className="modal" id="modal_paket">
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header bg-dark">
                <h4 className="text-warning">Form data Paket</h4>
              </div>
              <div className="modal-body">
                <form onSubmit={(ev) => this.simpanData(ev)}>
                  Jenis Paket
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={this.state.jenis_paket}
                    onChange={(ev) =>
                      this.setState({ jenis_paket: ev.target.value })
                    }
                  ></input>
                  Harga
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={this.state.harga}
                    onChange={(ev) => this.setState({ harga: ev.target.value })}
                  ></input>
                  <button className="btn btn-dark text-warning" type="submit">
                    Simpan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Paket;
