import { Avatar } from "@mui/material";
import "./post.css";
const Post = ({ userName, imgUrl, caption }) => {
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
    </div>
  );
};

export default Post;
