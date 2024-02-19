import React from "react";

const Loginbar = () => {
    return(
        <div style={{ width: '50vw', height: '40vh', marginLeft: '25vw'}}>
            <h1 style={{ display: 'flex', justifyContent: 'center',  marginTop: '40px',marginBottom: '40px' }}>
                A C C O U N T
            </h1>
            {/* Switch Bar */}
            <ul class="nav nav-tabs nav justify-content-center">
                <li class="nav-item">
                    <a class="nav-link active" href="#Login" aria-controls="Login" data-toggle="tab" role="tab ">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#Register" aria-controls="Register" data-toggle="tab" role="tab ">Register</a>
                </li>
            </ul>
            {/* Input Form */}
            {/* Login */}
            <div className="tab-content" id="TabContent">
                <div class="tab-pane fade show active" id="Login" aria-labelledby="Login_Tab" role="tabpanel" >
                    <form style={{marginTop: '40px'}}>
                        {/* Email form */}
                        <div class="input-group mb-4">
                            <input type="text" class="form-control" placeholder="University Email" aria-label="University Email" aria-describedby="basic-addon2"/>
                            <div class="input-group-append">
                                <span class="input-group-text" id="basic-addon2">@student.manchester.ac.uk</span>
                            </div>
                        </div>
                        {/* Submit Button */}
                        <ul class="nav justify-content-center">
                            <button type="submit" class="btn btn-primary">Login</button>
                        </ul> 
                    </form>
                </div>
                {/* Register */}
                <div class="tab-pane fade" id="Register" aria-labelledby="Register-Tab" role="tabpanel" >
                    <form style={{marginTop: '40px'}}>
                        {/* Email form */}
                        <div class="input-group mb-4">
                            <input type="text" class="form-control" placeholder="University Email" aria-label="University Email" aria-describedby="basic-addon2"/>
                            <div class="input-group-append">
                                <span class="input-group-text" id="basic-addon2">@student.manchester.ac.uk</span>
                            </div>
                        </div>
                        {/* Submit Button */}
                        <ul class="nav justify-content-center">
                            <button type="submit" class="btn btn-primary ">Submit</button>
                        </ul>  
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Loginbar;