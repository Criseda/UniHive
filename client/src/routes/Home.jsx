import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Search from "../components/Search";
import ItemList from "../components/Itemlist";
import backgroundImage from "../images/home_background.png";
import "../css/login.css";

const Home = () => {
  const scrollToItemList = () => {
    // Function to scroll to the item list section
    document.getElementById("itemList").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div
        className="my-3"
        style={{
          backgroundColor: "#4587f7",
          borderRadius: "15px",
          width: "80%",
          margin: "auto",
        }}
      >
        <Container>
          <Row>
            <Col md={6} className="d-flex align-items-center">
              {" "}
              {/* Added d-flex align-items-center class */}
              <div style={{ textAlign: "left", paddingLeft: "2rem" }}>
                {" "}
                {/* Added style to align text left */}
                <h1
                  style={{
                    textAlign: "left",
                    color: "white",
                    paddingBottom: "1rem",
                  }}
                >
                  Made by Students <br></br> for students{" "}
                </h1>
                <p className="mb-4" style={{ color: "white" }}>
                  The new way to shop. Cheaper, faster, better for the planet.
                </p>
                <Button variant="dark" size="lg" onClick={scrollToItemList}>
                  Shop now
                </Button>
              </div>
            </Col>
            <Col
              md={6}
              className="d-flex justify-content-center align-items-center"
            >
              {/* Center aligning the column */}
              <img
                src={backgroundImage}
                alt="Icons of people celebrating"
                style={{
                  maxWidth: "60%",
                  height: "auto",
                }}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <div id="itemList">
          <Search />
          <ItemList />
        </div>
      </Container>
    </>
  );
};

export default Home;
