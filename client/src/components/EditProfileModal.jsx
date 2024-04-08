import React, { useState, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Range from "react-bootstrap/FormRange";
import AvatarEditor from "react-avatar-editor";

const EditProfileModal = ({
  showModal,
  setShowModal,
  bio,
  avatar,
  setBio,
  setAvatar,
}) => {
  const [newBio, setNewBio] = useState(bio);
  const [newAvatar, setNewAvatar] = useState(avatar);
  const [scale, setScale] = useState(1);
  const editor = useRef(null);

  const handleSaveProfile = () => {
    if (editor.current) {
      const canvas = editor.current.getImageScaledToCanvas();
      const newAvatarDataUrl = canvas.toDataURL();
      setBio(newBio);
      setAvatar(newAvatarDataUrl);
    }
    setShowModal(false);
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Avatar</Form.Label>
            <AvatarEditor
              ref={editor}
              image={newAvatar}
              width={200}
              height={200}
              border={50}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={scale}
            />
            <Form.Control
              type="file"
              onChange={(e) =>
                setNewAvatar(URL.createObjectURL(e.target.files[0]))
              }
            />
            <Form.Label>Zoom</Form.Label>
            <Range
              min={1}
              max={2}
              step={0.01}
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newBio}
              onChange={(e) => setNewBio(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveProfile}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfileModal;
