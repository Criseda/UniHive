import React from "react";

function Stars({ starnumber }) {
    switch (starnumber) {
        case "1":
            return <div className="d-flex justify-content-center">
                            <div>
                                <img src="/images/star.png" width="50" height="50" alt="star"></img>
                            </div>
                        </div>;
        case "2":
            return <div className="d-flex justify-content-center">
                            <div>
                                <img src="/images/star.png" width="50" height="50" alt="star"></img>
                                <img src="/images/star.png" width="50" height="50" alt="star"></img>
                            </div>
                        </div>;

        case "3":
            return <div className="d-flex justify-content-center">
                            <div>
                                <img src="/images/star.png" width="50" height="50" alt="star"></img>
                                <img src="/images/star.png" width="50" height="50" alt="star"></img>
                                <img src="/images/star.png" width="50" height="50" alt="star"></img>
                            </div>
                        </div>;

        case "4":
            return <div className="d-flex justify-content-center">
                            <div>
                                <img src="/images/star.png" width="50" height="50" alt="star"></img>
                                <img src="/images/star.png" width="50" height="50" alt="star"></img>
                                <img src="/images/star.png" width="50" height="50" alt="star"></img>
                                <img src="/images/star.png" width="50" height="50" alt="star"></img>
                            </div>
                        </div>;

        case "5":
       return <div className="d-flex justify-content-center">
                        <div>
                            <img src="/images/star.png" width="50" height="50" alt="star"></img>
                            <img src="/images/star.png" width="50" height="50" alt="star"></img>
                            <img src="/images/star.png" width="50" height="50" alt="star"></img>
                            <img src="/images/star.png" width="50" height="50" alt="star"></img>
                            <img src="/images/star.png" width="50" height="50" alt="star"></img>
                        </div>
                    </div>;
        
      default:
        return <div className="d-flex justify-content-center">
                    <div>
                        <img src="/images/star.png" width="50" height="50" alt="star"></img>
                        <img src="/images/star.png" width="50" height="50" alt="star"></img>
                        <img src="/images/star.png" width="50" height="50" alt="star"></img>
                        <img src="/images/star.png" width="50" height="50" alt="star"></img>
                        <img src="/images/star.png" width="50" height="50" alt="star"></img>
                    </div>
                </div>;
    }
  }

export default Stars;
