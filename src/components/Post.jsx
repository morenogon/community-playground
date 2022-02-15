import React from 'react';
import '../styles/Post.scss';
import { Avatar } from '@nextui-org/react';
import Button from './Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import ShareIcon from '@mui/icons-material/Share';

const Post = ({ avatar, name, nickname, timestamp, message }) => {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar src={avatar} size="lg" />
        <div className="post__info">
          <div className="post__info-header">
            <h5>{name}</h5>
            <h6>{nickname}</h6>
          </div>
          <p className="post__timestamp">{timestamp}</p>
        </div>
      </div>
      <div className="post__body">
        <p className="post__body-message">{message}</p>
      </div>
      <div className="post__footer">
        <Button type="post" LeftIcon={FavoriteIcon} title="Like" />
        <Button type="post" LeftIcon={ChatIcon} title="Comment" />
        <Button type="post" LeftIcon={ShareIcon} title="Share" />
      </div>
    </div>
  );
};

export default Post;
