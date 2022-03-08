import React from "react";

export default function UserCard({ nama, username, role, edit, hapus }) {
  return (
    <div className="row">
      <div className="col-lg-4">
        <small className="text-info">Nama</small>
        <br />
        <h5>{nama}</h5>
      </div>
      <div className="col-lg-3">
        <small className="text-info">Username</small>
        <br />
        <h5>{username}</h5>
      </div>
      <div className="col-lg-3">
        <small className="text-info">Role</small>
        <br />
        <h5>{role}</h5>
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
