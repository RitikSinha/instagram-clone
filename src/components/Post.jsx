import { Avatar, Input, Button } from "@mui/material";
import "./post.css";
import { useEffect, useState } from "react";
import { collection, onSnapshot, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { uuidv4 } from "@firebase/util";
const Post = ({ userName, imgUrl, caption, id, author }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  //get comments
  const getData = () => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "comments"),
      (querySnapshot) => {
        setComments(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      },
      (error) => {
        // ...
        console.log(error);
      }
    );
    return unsubscribe;
  };
  useEffect(() => {
    getData();
  }, []);
  //add comments
  const addComment = async (e, comment) => {
    e.preventDefault();
    await setDoc(doc(db, "posts", id, "comments", uuidv4()), {
      author: author,
      text: comment,
    });
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar alt={userName} src="/static/images/avatar/1.jpg" />
        <h4>{userName}</h4>
      </div>
      <div className="post__imgbox">
        <img src={imgUrl} alt="laptop" className="post__img" />
      </div>
      <div className="post__footer">
        <p>
          {" "}
          <strong>{userName}</strong> {caption}
        </p>
      </div>
      <div className="post__comments">
        {author ? (
          <div className="post__comment">
            <Input
              className="post__comment_input"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />{" "}
            <Button
              className="post__comment_button"
              disabled={!comment}
              onClick={(e) =>
                addComment(e, comment).then(() => setComment(" "))
              }
            >
              post
            </Button>
          </div>
        ) : (
          <p>
            <strong>YOU NEED TO LOGIN IN ORDER TO COMMENT</strong>
          </p>
        )}

        {comments.map((comment) => (
          <p className="post__comments">
            <strong>{comment.author}</strong> {comment.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Post;
