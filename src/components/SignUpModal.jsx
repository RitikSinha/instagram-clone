import React, { useState } from "react";
import { Modal, Box, Typography, Input, Button } from "@mui/material";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #2c2c2c",
  boxShadow: 24,
  p: 4,
};

const SignUpModal = ({ open, onClose, close }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignup = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        user.displayName = username;
        setEmail("");
        setPassword("");
        setUsername("");
        close(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);

        // ..
      });
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Signup
        </Typography>
        <form className="signupmodal__form" onSubmit={handleSignup}>
          <Input
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            security="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleSignup}>Sign Up</Button>
        </form>
      </Box>
    </Modal>
  );
};

export default SignUpModal;
