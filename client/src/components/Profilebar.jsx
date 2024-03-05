import React from "react";


const Profilebar = () => {
    return (

        <div className="container">

            <div  className="row justify-content-center mt-3">

            
                <button type="button" class="btn btn-white wd-25" data-toggle="modal" data-target="#exampleModal">
                    <img src="/images/logo.jpg" class="img-thumbnail rounded-circle" alt="photo"/>
                </button>


                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        <div class="modal-body">
                            <h1>hhhhhhh</h1>
                        </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
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