import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Typography, Button, Spin, Alert } from 'antd';
import useFetchPostById from '../../apis/post/use-fetch-post-by-id';

const { Title } = Typography;

const PostDetail: React.FC = () => {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();

  if (!postId) {
    navigate('/post');
    return (<></>);
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading, isError } = useFetchPostById(postId);

  if (isLoading) return <Spin size="large" />;
  if (isError) return <Alert message="Error fetching post data" type="error" />;

  return (
    <div className="flex flex-col h-full overflow-auto">
      <div className='flex'>
        <Button type="link" onClick={() => navigate('/post')}>Back to Post List</Button>
      </div>
      {
        data && 'success' in data && data.success && (
          <>
            <div className='mb-1'>
              <Title id='title' level={2}>{data.post.title}</Title>
            </div>
            <div className="flex-1 p-1 my-2" dangerouslySetInnerHTML={{ __html: data.post.content }} />
            <div className='flex my-2'>
              <div className='flex justify-center items-center'>
                Tags: 
              </div>
              {
                data.post.tags.map((tag) => <div key={tag.id} className='border border-black my-1 p-1 m-1'>{tag.name}</div>)
              }
            </div>
            <div className='flex items-center mt-2 mb-5'>
              <div className='mr-2'>Posted By:</div>
              <div className='mx-2'>Name: {data.post.user.name}</div>
              <div className='mx-2'>Email: {data.post.user.email}</div>
              <div className='mx-2'>@</div>
              <div className='mx-2'>{new Date(data.post.created_at).toLocaleString()}</div>
            </div>
          </>
        )
      }
    </div>
  );
};

export default PostDetail;
