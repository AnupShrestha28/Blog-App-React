import { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase-config";

const Home = ({ isAuth }) => {
  const [postList, setPostList] = useState([]);
  const [showLoginMessage, setShowLoginMessage] = useState(true);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();

    if (isAuth) {
      setShowLoginMessage(false);
    }
  }, [isAuth]);

  const deletePost = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      try {
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc);
        console.log("Post deleted successfully.");
        setPostList((prevPostList) =>
          prevPostList.filter((post) => post.id !== id)
        );
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoginMessage(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="homePage">
      {showLoginMessage && (
        <div className="loginMessageContainer">
          <p className="messageInfo">Login to create a blog</p>
        </div>
      )}
      {postList.map((post) => {
        return (
          <div className="post" key={post.id}>
            <div className="postHeader">
              <div className="title">
                <h1>{post.title}</h1>
              </div>

              <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser?.uid && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    &#128465;
                  </button>
                )}
              </div>
            </div>
            <div className="postTextContainer">{post.postText}</div>
            <h3>@{post.author.name}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
