import React, { useEffect, useState } from "react";
import { Button, Image, Container, Col, Alert } from "react-bootstrap";
import { getUser, getLoggedInUser } from "../api/items";
import Stars from "./Star";
import EditProfileModal from "./EditProfileModal";

const Profilebar = ({ user_id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [createdAt, setCreatedAt] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [rating, setRating] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [banned, setBanned] = useState(null);
  const [isOwnAccount, setIsOwnAccount] = useState(false);

  useEffect(() => {
    getUser(user_id)
      .then((data) => {
        const date = new Date(data.created_at);
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = date.toLocaleDateString(undefined, options);

        setCreatedAt(formattedDate);
        setName(data.first_name + " " + data.last_name);
        setBio(data.bio);
        setRating(data.rating !== null ? data.rating : 0);
        setAvatar(data.avatar_path);
        setBanned(data.banned);

        getLoggedInUser().then((user) => {
          if (user && user.id === user_id) {
            setIsOwnAccount(true);
          }
        });
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user_id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (banned) {
    return <Alert variant="danger">This user has been banned.</Alert>;
  }

  if (error) {
    return <Alert variant="danger">{error.toString()}</Alert>;
  }

  return (
    <>
      <Container className="d-flex pt-4">
        <Col xs="auto" className="p-3">
          <Image
            src={avatar ? avatar : "/images/logo.jpg"}
            roundedCircle
            fluid
            alt="avatar"
          />
        </Col>

        <Col className="d-flex flex-column align-items-start p-2 text-break text-wrap">
          <h2 className="m-0">
            {name} {isOwnAccount && "(You)"}
          </h2>
          <p className="m-0 text-muted small font-weight-normal">
            Member since: {createdAt}
          </p>
          <div className="pt-2">
            <Stars starnumber={rating} mobileSize={"lg"} size={"2x"} />
          </div>
          <h3 className="pt-4">Bio:</h3>
          <pre>{bio ? bio : "This user has not set up a bio yet."}</pre>
        </Col>

        {isOwnAccount && (
          //Edit profile button
          <Col xs="auto">
            <Button
              variant="secondary"
              className="m-2 mt-3"
              onClick={() => setShowModal(true)}
            >
              Edit profile
            </Button>
          </Col>
        )}
        {isOwnAccount && (
          <EditProfileModal
            showModal={showModal}
            setShowModal={setShowModal}
            bio={bio}
            avatar={avatar}
            setBio={setBio}
            setAvatar={setAvatar}
          />
        )}
      </Container>
      <h4 className="pt-3 text-center h4 font-weight-bold">Posted items</h4>
    </>
  );
};

export default Profilebar;
