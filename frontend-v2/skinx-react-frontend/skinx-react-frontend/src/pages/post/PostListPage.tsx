/* eslint-disable no-useless-concat */
/* eslint-disable import/no-absolute-path */
import React from 'react';
import PostList from '../../features/components/post/PostList';

const PostListPage: React.FC = () => {
  return (
    <div className='h-full max-h-screen'>
      <PostList />
    </div>
  );
};

export default PostListPage;
