import React from "react";

import Stars from "./Star";

const Profilebar = () => {
  return (
    <div className="container d-flex">
      <button
        type="button"
        className="btn btn-white rounded-circle w-25 p-0 max-width: 100%"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <img
          src="/images/logo.jpg"
          className="img-thumbnail rounded-circle border-0 p-0"
          alt="avator"
        />
      </button>

      <div
        className="modal fade border-0"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="seting_avatar"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title text-center" id="seting_avatar">
                Set up your avatar
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body border-0">
              <img src="/images/logo.jpg" alt="photo" />

              <input type="file" className="form-control" id="customFile" />
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center flex-grow-1">
        <div className="row text-center mt-2">
          <p>User Name</p>
        </div>

        <div className="row text-center mt-3">
          <p>Email address</p>
        </div>

        <div className="row mt-3">
          <Stars starnumber={2.5} />
        </div>
      </div>
    </div>
  );
  // change starnumber to change the number of stars, the prop here is a string
};

export default Profilebar;
