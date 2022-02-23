import React, { useState, useEffect } from 'react';
import * as uuid from 'uuid';
import { Avatar } from '@nextui-org/react';
import { collection, doc, setDoc, serverTimestamp, onSnapshot, orderBy, query } from 'firebase/firestore';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
// styles
import '../styles/Feed.scss';

// components
import InputOption from './InputOption';
import Post from './Post';

// data
import db from '../firebase/firebase.config';
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EventIcon from '@mui/icons-material/Event';

const Feed = () => {
  const user = useSelector(selectUser);

  const [input, setInput] = useState('');
  const [posts, setPosts] = useState([]);

  // real time connection to db
  useEffect(() => {
    const queryPosts = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));

    onSnapshot(queryPosts, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
  }, []);

  const sendPost = (e) => {
    e.preventDefault();

    // Add a new document in collection "posts"
    // When you use set() to create a document, you must specify an ID for the document to create.
    setDoc(doc(db, 'posts', uuid.v4()), {
      name: user.displayName,
      avatar: user.photoUrl,
      nickname: `@${user.userName}`,
      message: input,
      timestamp: serverTimestamp(),
    });

    setInput('');
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <form>
            <Avatar src={user?.photoUrl} size="lg" />
            <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="What's happening?" />
            <button onClick={sendPost} type="submit">
              Send
            </button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOption Icon={AddPhotoAlternateIcon} title="Photo" color="inputoption__icon green" />
          <InputOption Icon={SlowMotionVideoIcon} title="Video" color="inputoption__icon blue" />
          <InputOption Icon={EventIcon} title="Event" color="inputoption__icon orange" />
        </div>
      </div>
      <div className="feed__postsContainer">
        {posts && posts.map(({ id, data: { avatar, name, nickname, message } }) => <Post key={id} avatar={avatar} name={name} nickname={nickname} message={message} />)};
      </div>
    </div>
  );
};

export default Feed;
