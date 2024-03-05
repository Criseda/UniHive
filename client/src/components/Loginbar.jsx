import React from "react";
import { loginRoute } from "../api/authentication";

const Loginbar = () => {
  return (
    <div style={{ width: "50vw", height: "40vh", marginLeft: "25vw" }}>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
          marginBottom: "40px",
        }}
      >
        A C C O U N T
      </h1>

      {/* Switch Bar */}
      <ul className="nav nav-tabs nav justify-content-center">
        <li className="nav-item">
          <a
            className="nav-link active"
            href="#Login"
            aria-controls="Login"
            data-toggle="tab"
            role="tab "
          >
            Login
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="#Register"
            aria-controls="Register"
            data-toggle="tab"
            role="tab "
          >
            Register
          </a>
        </li>
      </ul>

      {/* Input Form */}

      {/* Login */}
      <div className="tab-content" id="TabContent">
        <div
          className="tab-pane fade show active"
          id="Login"
          aria-labelledby="Login_Tab"
          role="tabpanel"
        >
          <form style={{ marginTop: "40px" }}>
            {/* Email form */}
            <div className="input-group mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="University Email"
                aria-label="University Email"
                aria-describedby="basic-addon2"
              />
              <span className="input-group-text" id="basic-addon2">
                @student.manchester.ac.uk
              </span>
            </div>
            {/* Submit Button */}
            <ul className="nav justify-content-center">
              <a
                href={loginRoute}
                className="btn btn-primary"
              >
                Log in
              </a>
            </ul>
          </form>
        </div>

        {/* Register */}
        <div
          className="tab-pane fade"
          id="Register"
          aria-labelledby="Register-Tab"
          role="tabpanel"
        >
          <form style={{ marginTop: "40px" }}>
            {/* Email form */}
            <div className="input-group mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="University Email"
                aria-label="University Email"
                aria-describedby="basic-addon2"
              />
              <span className="input-group-text" id="basic-addon2">
                @student.manchester.ac.uk
              </span>
            </div>
            {/* Submit Button */}
            <ul className="nav justify-content-center">
              <a
                href={loginRoute}
                className="btn btn-primary"
              >
                Log in
              </a>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Loginbar;
