import logo from "../src/assets/logo.png";
import Post from "./components/Post";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import SignUpModal from "./components/SignUpModal";
import LogInModal from "./components/LogInModal";
import { db } from "./firebase";
import { Button } from "@mui/material";

function App() {
  const [posts, setPosts] = useState([]);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const getPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    setPosts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="App">
      <div className="app__header">
        <div className="header__logo">
          <img src={logo} alt="logo" className="logo" width="100" />
        </div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setIsSignupOpen(true);
          }}
        >
          {" "}
          Sign UP{" "}
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setIsLoginOpen(true);
          }}
        >
          {" "}
          Log In{" "}
        </Button>
      </div>
      <SignUpModal open={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
      <LogInModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      {posts?.map((post) => (
        <Post
          key={post.id}
          caption={post.caption}
          imgUrl={post.imgUrl}
          userName={post.userName}
        />
      ))}
    </div>
  );
}

export default App;
