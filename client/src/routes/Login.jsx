import React from "react";
import Navbar from "../components/NavbarLoggedOut";
import { Container, Col, Row, Button, Image } from "react-bootstrap";
import BuyIllustration from "../images/BuyIllustration.jpg";
import { loginRoute } from "../api/authentication";
import "../css/login.css";

const Login = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <div style={{ textAlign: "left" }}>
              <h1 style={{ textAlign: "left" }}>Welcome To UniHive!</h1>
              <h4>It seems that you aren't logged in ...</h4>
              <br />
              <h4 style={{ color: "purple" }}>
                Login with your UOM details to join the Hive and start selling
                today!
              </h4>
              <Button
                size="lg"
                href={loginRoute}
                variant="primary"
                className="mt-3"
              >
                Join the Hive!
              </Button>
            </div>
          </Col>
          <Col md={6}>
            <Image src={BuyIllustration} alt="man reading book" fluid />
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row style={{ backgroundColor: "#2047f5" }} className="text-center">
          <Col md={{ span: 6, offset: 3 }} className="py-5 white-text">
            <div className="white-text">
              <h1>Why Join us?</h1>
              <p>
                {" "}
                Uni Hive was created with the goal of providing a platform where
                students can buy, sell, and exchange items with one another
                within their university community. Whether you're looking to
                declutter your room, find affordable textbooks, or discover
                unique items from fellow students, Uni Hive is the place for
                you.
              </p>
              <p>
                Our mission is to promote sustainability, affordability, and
                community engagement among students. By reusing and repurposing
                items, we aim to reduce waste and contribute to a more
                environmentally conscious lifestyle. At Uni Hive, every
                transaction helps build a more sustainable future.
              </p>
              <p>
                Join the hive today and become part of our vibrant community of
                student sellers and buyers. Together, we can create a connected,
                sustainable, and student-friendly marketplace for everyone to
                enjoy.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
