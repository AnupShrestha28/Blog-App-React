import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ isAuth }) => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [error, setError] = useState("");

  const postsCollectionRef = collection(db, "posts");

  let navigate = useNavigate();

  const createpost = async () => {
    if (!title && !postText) {
      setError("Title and Post are required");
    } else if (!title) {
      setError("Title is required");
    } else if (!postText) {
      setError("Description is required");
    } else {
      await addDoc(postsCollectionRef, {
        title,
        postText,
        author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      });
      navigate("/");
    }

    setTimeout(() => {
      setError("");
    }, 4000);
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create a post</h1>
        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>} 
        <div className="inputGp">
          <label>Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
              setError("");
            }}
          />
        </div>

        <div className="inputGp">
          <label>Blog Description:</label>
          <textarea
            placeholder="Description..."
            onChange={(event) => {
              setPostText(event.target.value);
              setError("");
            }}
          />
        </div>

        <button onClick={createpost}>Submit Post</button>
      </div>
    </div>
  );
};

export default CreatePost;
