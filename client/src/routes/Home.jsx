import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Search from "../components/Search";
import ItemList from "../components/Itemlist";
import backgroundImage from "../images/home_background.png"; // Import your wide image

const Home = () => {
  const scrollToItemList = () => {
    // Function to scroll to the item list section
    document.getElementById("itemList").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div
        className="mx-5 my-3"
        style={{
          backgroundColor: "#add8e6",
          padding: "0px 0",
          borderRadius: "15px",
        }}
      >
        <Container>
          <Row>
            <Col md={6} className="d-flex align-items-center">
              {" "}
              {/* Added d-flex align-items-center class */}
              <div style={{ textAlign: "left" }}>
                {" "}
                {/* Added style to align text left */}
                <h1 style={{ textAlign: "left" }}>
                  Made by Students <br></br> for students{" "}
                </h1>
                <p className="mb-4">
                  The new way to shop. Cheaper, faster, better for the planet.
                </p>
                <Button variant="primary" size="lg" onClick={scrollToItemList}>
                  Shop now
                </Button>
              </div>
            </Col>
            <Col md={6}>
              <img
                src={backgroundImage}
                alt="Icons of people celebrating"
                style={{
                  maxWidth: "80%",
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
