import React, { useState, useEffect } from 'react';
import '../styles/Feed.scss';
import { Avatar } from '@nextui-org/react';
import InputOption from './InputOption';
import Post from './Post';
import { collection, getDocs } from 'firebase/firestore';
import db from '../firebase/firebase.config';

const Feed = () => {
  const [input, setInput] = useState('');
  const [posts, setPosts] = useState([]);

  // real time connection to de db
  useEffect(() => {
    const getPosts = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      setPosts(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    };

    getPosts();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      console.log('posts updated 🚀');
      console.log(posts);
    }
  }, [posts]);

  const sendPost = (e) => {
    e.preventDefault();
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <form>
            <Avatar
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
              size="lg"
            />
            <input
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="What's happening?"
            />
            <button onClick={sendPost} type="submit">
              Send
            </button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOption
            icon="https://cdn-icons-png.flaticon.com/128/747/747510.png"
            title="Photo"
          />
          <InputOption
            icon="https://cdn-icons.flaticon.com/png/128/4340/premium/4340106.png?token=exp=1644797321~hmac=82a3990eaedcd059a625d1f663c1ef7d"
            title="Video"
          />
          <InputOption
            icon="https://cdn-icons.flaticon.com/png/128/661/premium/661553.png?token=exp=1644797465~hmac=fb67730c68195f8b3b4b2919d86cf29b"
            title="Event"
          />
        </div>
      </div>
      <div className="feed__postsContainer">
        <h1>POSTS</h1>
        {posts &&
          posts.map(
            ({ id, data: { name, nickname, message, photo, timestamp } }) => {
              <Post
                key={id}
                avatar={photo}
                name={name}
                nickname={nickname}
                timestamp={timestamp}
                message={message}
              />;
            }
          )}
      </div>
    </div>
  );
};

export default Feed;
