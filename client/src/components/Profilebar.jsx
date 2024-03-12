import React from "react";


const Profilebar = () => {
    return (

        <div className="container">

            <div  className="row justify-content-center mt-3">
                <button type="button" className="btn btn-white rounded-circle w-25 p-0" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <img src="/images/logo.jpg" className="img-thumbnail rounded-circle border-0 p-0" alt="photo"/>
                </button>


                <div className="modal fade border-0" id="exampleModal" tabindex="-1" aria-labelledby="seting_avatar" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <h5 className="modal-title text-center" id="seting_avatar">Set up your avatar</h5>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        <div className="modal-body border-0">
                            <img src="/images/logo.jpg"  alt="photo"/>
                            
                            <input type="file" class="form-control" id="customFile" />

                        </div>
                            <div className="modal-footer border-0">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
 

            <div className="row text-center mt-2">
                <p>User Name</p>
            </div>

            <div className="row text-center mt-3">
                <p>Email address</p>
            </div>
            <p className="mt-3">Post items</p>
        </div>
    );
  };
  
  export default Profilebar;