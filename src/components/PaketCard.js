import React from "react";

export default function PaketCard({ nama_paket, harga_paket, edit, hapus }) {
  return (
    <div className="row">
      <div className="col-lg-5">
        <small className="text-info">Nama Paket</small>
        <br />
        <h5>{nama_paket}</h5>
      </div>
      <div className="col-lg-5">
        <small className="text-info">harga</small>
        <br />
        <h5>{harga_paket}</h5>
      </div>
      <div className="col-lg-2">
        <div className="d-grid gap-1">
          <button className="btn btn-sm btn-primary" onClick={edit}>
            Edit
          </button>
          <button className="btn btn-sm btn-danger" onClick={hapus}>
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
