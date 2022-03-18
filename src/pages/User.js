import React from "react"
import {Modal} from "bootstrap"
import axios from "axios"


class User extends React.Component {
    constructor() {
        super()
        this.state = {
            users: [
                {
                    id_user: '1',
                    nama: 'bababs',
                    alamat: 'hohohoho',
                    jenis_kelamin: 'Male',
                    telepon: '082264134484',
                },
                {
                    id_user: '2',
                    nama: 'rammwmdmwi',
                    alamat: 'Malang',
                    jenis_kelamin: 'Male',
                    telepon: '089138277732',
                },
                {
                    id_user: '3',
                    nama: 'Genta Badawdawdahatara',
                    alamat: 'Tulungagung',
                    jenis_kelamin: 'Male',
                    telepon: '087321387621',
                },
            ],
            id_user: "",
            nama: "",
            alamat: "",
            telepon: "",
            jenis_kelamin: "",
            action: "",
            fillPassword: true,
        }
    }

    createData() {
        //show create modal
        this.modalUser = new Modal(document.getElementById("modal-user"))
        this.modalUser.show()

        //empty modal input
        this.setState({
            id: Math.random(1, 1000),
            nama: "",
            alamat: "",
            telepon: "",
            jenis_kelamin: "pria",
            action: "tambah",
            fillPassword: true
        })
    }
    simpanData(event) {
        event.preventDefault();
        // preventDefault -> mencegah aksi default dari form submit

        // cek aksi tambah atau ubah
        if (this.state.action === "tambah") {
            let endpoint = "http://localhost:8000/api/users"
            // menampung data isian dalam user
            let data = {
                id_user: this.state.id_user,
                nama: this.state.nama,
                alamat: this.state.alamat,
                jenis_kelamin: this.state.jenis_kelamin,
                telepon: this.state.telepon
            }

            axios.post(endpoint, data)
            .then(response => {
                window.alert(response.data.message)
                this.getData()
            })
            .catch(error => console.log(error))

            // menghilangkan modal
            this.modalUser.hide()
        } else if (this.state.action === "ubah") {
            let endpoint = "http://localhost:8000/api/users/" + this.state.id_user

            let data = {
                id_user: this.state.id_user,
                nama: this.state.nama,
                alamat: this.state.alamat,
                jenis_kelamin: this.state.jenis_kelamin,
                telepon: this.state.telepon
            }

            if(this.state.fillPassword === true){
                data.password = this.state.password
            }

            axios.put(endpoint, data)
            .then(response => {
                window.alert(response.data.message)
                this.getData()
            })
            .catch(error => console.log(error))

            this.modalUser.hide()
        }
    }

    ubahData(id_user){
        this.modalUser = new Modal(document.getElementById("modal-users"))
        this.modalUser.show() // menampilkan modal

        // mencari index posisi dari data member yang akan diubah
        let index = this.state.users.findIndex(
            user => user.id_user === id_user
        )

        this.setState({
            id_user: this.state.users[index].id_user,
            nama: this.state.users[index].nama,
            alamat: this.state.users[index].alamat,
            jenis_kelamin: this.state.users[index].jenis_kelamin,
            telepon: this.state.users[index].telepon,
            action: "ubah",
            fillPassword: false,
        })

    }

    hapusData(id_user) {
        if (window.confirm("Are You Sure?")) {

            let endpoint = "http://localhost:8000/api/users/" + id_user 

            axios.delete(endpoint)
            .then(response => {
                window.alert(response.data.message)
                this.getData()
            })
            .catch(error => console.log(error))
            // mencari posisi index dari data yang akan dihapus
            // let temp = this.state.users
            // let index = temp.findIndex(user => user.id_user === id_user)

            // menghapus data pada array
            // temp.splice(index,1)

            // this.setState({users: temp})
        }
    }

    getData() {
        let endpoint = "http://localhost:8000/api/users"
        axios.get(endpoint)
        .then(response => {
            this.setState({users: response.data})
        })
        .catch(error => console.log(error))
    }

    componentDidMount() {
        // fungsi ini dijalankan setelah fungsi render
        // berjalan
        this.getData()
    }

    showPassword(){
        if(this.state.fillPassword === true){
            return(
                <div>
                    Password
                    <input type="password" className="from-control m-1"
                    required value={this.state.password}
                    onChange={ev => this.setState({password: ev.target.value})}/>
                </div>
            )
        } else {
            return (
                <button className="mb-1 btn btn-success"
                onClick={() => this.setState ({fillPassword: true})}>
                    Change Password
                </button>
            )
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-header bg-dark">
                    <h4 className="text-white">List Daftar User</h4>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                            {this.state.users.map(user => (
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <small className="text-info">Nama</small> <br />
                                            <h5>{user.nama}</h5>
                                        </div>
                                        <div className="col-lg-1">
                                            <small className="text-info">Gender <br /></small>
                                            <h5>{user.jenis_kelamin}</h5>
                                        </div>
                                        <div className="col-lg-2">
                                            <small className="text-info">Telepon <br /></small>
                                            <h5>{user.telepon}</h5>
                                        </div>
                                        <div className="col-lg-4">
                                            <small className="text-info">Alamat <br /></small>
                                            <h5>{user.alamat}</h5>
                                        </div>
                                        <div className="col-lg-2">
                                            <small className="text-info">Action <br /></small>
                                            <button className="btn btn-outline-success btn-sm mx-1" 
                                            onClick={() => this.ubahData(user.id_user)}>
                                                Edit
                                            </button>

                                            <button className="btn btn-outline-danger btn-sm"
                                            onClick={() => this.hapusData(user.id_user)}>
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    <button type="button" className="btn btn-success mt-3" onClick={() => this.createData()}>
                        Tambah User
                    </button>
                </div>
                {/* Create User Modal */}
                <div className="modal" id="modal-user">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <div className="modal-header bg-success">
                                <h4 className="text-white">
                                    Form User
                                </h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.simpanData(ev)}>
                                    Nama
                                    <input type="text" className="form-control mb-2" value={this.state.nama} onChange={ev => this.setState({ nama: ev.target.value })} required />

                                    Alamat
                                    <input type="text" className="form-control mb-2" value={this.state.alamat} onChange={ev => this.setState({ alamat: ev.target.value })} required />

                                    Telepon
                                    <input type="text" className="form-control mb-2" value={this.state.telepon} onChange={ev => this.setState({ telepon: ev.target.value })} required />

                                    Jenis Kelamin
                                    <select className="form-control mb-2" value={this.state.jenis_kelamin} onChange={ev => this.setState({ jenis_kelamin: ev.target.value })}>
                                        <option value="Pria">Pria</option>
                                        <option value="Wanita">Wanita</option>
                                    </select>

                                    <button className="btn btn-success btn-sm" type="submit">Simpan</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default User