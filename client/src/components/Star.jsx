import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as faStarFull,
  faStarHalfAlt as faStarHalf,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";

function Stars({ starnumber }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const starSize = windowWidth < 768 ? "lg" : "2x"; // dynamically change star size based on window width

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(starnumber)) {
      stars.push(
        <FontAwesomeIcon
          icon={faStarFull}
          key={i}
          size={starSize}
          style={{ color: "#FFD43B" }}
        />
      );
    } else if (i === Math.floor(starnumber) && !Number.isInteger(starnumber)) {
      stars.push(
        <FontAwesomeIcon
          icon={faStarHalf}
          key={i}
          size={starSize}
          style={{ color: "#FFD43B" }}
        />
      );
    } else {
      stars.push(
        <FontAwesomeIcon
          icon={faStarEmpty}
          key={i}
          size={starSize}
          style={{ color: "#FFD43B" }}
        />
      );
    }
  }

  return <div className="d-flex justify-content-start pt-2">{stars}</div>;
}

export default Stars;
