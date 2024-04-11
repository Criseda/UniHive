import React, { useState, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Range from "react-bootstrap/FormRange";
import AvatarEditor from "react-avatar-editor";
import { uploadAvatar, updateUserBio } from "../api/items";
const EditProfileModal = ({
  user_id,
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

  const handleSaveProfile = async () => {
    if (editor.current) {
      const canvas = editor.current.getImageScaledToCanvas();
      const newAvatarDataUrl = canvas.toDataURL();

      // Convert data URL to blob
      const blobResponse = await fetch(newAvatarDataUrl);
      const blob = await blobResponse.blob();

      // Create a new file object from the blob
      const file = new File([blob], `${user_id}.png`, { type: "image/png" });

      // Upload the file here instead of in handleFileChange
      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("user_id", user_id);

      const avatar_data = await uploadAvatar(formData);
      if (avatar_data.avatarUrl) {
        setNewAvatar(avatar_data.avatarUrl);
        setAvatar(avatar_data.avatarUrl);
  
        // Update the user's bio
        const bioData = await updateUserBio(user_id, newBio);
        if (bioData.bio) {
          setBio(newBio);
        } else {
          alert(bioData.error);
          return;
        }
      } else {
        alert(avatar_data.error);
        return;
      }
  
      setShowModal(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the file is an image
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
            <Form.Control type="file" onChange={handleFileChange} />
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
