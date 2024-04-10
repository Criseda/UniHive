import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AboutImage from "../images/AboutImage.jpg";
import "../css/about.css";

const About = () => {
  return (
    <Container className="mt-5">
      <Row className="align-items-center">
        <Col md={6} className="text-center">
          <h1>About Uni Hive</h1>
          <p>
            Welcome to Uni Hive, the second-hand marketplace designed
            exclusively for students!
          </p>
          <p>
            Uni Hive was created with the goal of providing a platform where
            students can buy, sell, and exchange items with one another within
            their university community. Whether you're looking to declutter your
            room, find affordable textbooks, or discover unique items from
            fellow students, Uni Hive is the place for you.
          </p>
          <p>
            Our mission is to promote sustainability, affordability, and
            community engagement among students. By reusing and repurposing
            items, we aim to reduce waste and contribute to a more
            environmentally conscious lifestyle. At Uni Hive, every transaction
            helps build a more sustainable future.
          </p>
          <p>
            Join the hive today and become part of our vibrant community of
            student sellers and buyers. Together, we can create a connected,
            sustainable, and student-friendly marketplace for everyone to enjoy.
          </p>
          <p>Happy shopping!</p>
        </Col>
        <Col md={6} className="text-center">
          <img
            src={AboutImage}
            alt="Person searching for used books"
            style={{ maxWidth: "70%", height: "auto" }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default About;
