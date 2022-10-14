import { Button, Input } from "@mui/material";
import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";

const ImageUpload = ({ user }) => {
  const [image, setImage] = useState();
  const [progress, setProgress] = useState();
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const addPost = async (url, cap, userName) => {
    await setDoc(doc(db, "posts", uuidv4()), {
      userName: userName,
      caption: cap,
      imgUrl: url,
    });
  };
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    console.log(image);
    const storageRef = ref(storage, `images/${uuidv4()}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setIsUploading(true);
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => {
        setIsUploading(false);
        console.log(err);
        alert(err.message);
      },
      () => {
        setIsUploading(false);
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          const username = user.email.split("@");
          addPost(downloadURL, caption, username[0]).then(() => {
            setCaption("");
            setImage("");
            setProgress("");
          });
        });
      }
    );
  };
  return (
    <div>
      <Input
        type="text"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="caption"
      />
      <Input onChange={(e) => handleChange(e)} type="file" />
      <Button onClick={handleUpload} disabled={isUploading}>
        Upload
      </Button>
    </div>
  );
};

export default ImageUpload;
