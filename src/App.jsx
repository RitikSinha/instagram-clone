import logo from "../src/assets/logo.png";
import Post from "./components/Post";
import { useState, useEffect } from "react";
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import SignUpModal from "./components/SignUpModal";
import LogInModal from "./components/LogInModal";
import ImageUpload from "./components/ImageUpload";
import { db, auth } from "./firebase";
import { Button } from "@mui/material";
import { async } from "@firebase/util";

function App() {
  const [posts, setPosts] = useState([]);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState();
  const getData = () => {
    const unsubscribe = onSnapshot(
      collection(db, "posts"),
      (querySnapshot) => {
        console.log(querySnapshot);
        setPosts(
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
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe();
  });
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="App">
      <div className="app__header">
        <div className="header__logo">
          <img src={logo} alt="logo" className="logo" width="100" />
        </div>
        {user ? (
          <Button
            onClick={(e) => {
              e.preventDefault();
              auth.signOut();
            }}
          >
            Log Out
          </Button>
        ) : (
          <div>
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
        )}
      </div>
      <SignUpModal
        open={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        close={setIsSignupOpen}
      />
      <LogInModal
        open={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        close={setIsLoginOpen}
      />
      {user ? <ImageUpload user={user} /> : <div>please sign in to upload</div>}
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
