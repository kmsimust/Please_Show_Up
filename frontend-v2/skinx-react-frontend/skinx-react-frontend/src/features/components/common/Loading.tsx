import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <LoadingOutlined className="text-4xl opacity-70" />
    </div>
  );
};

export default Loading;
