/* eslint-disable react/require-default-props */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import config from '../../../config';
import { Table, Spin, Alert, Typography, Input, Select } from 'antd';
import useFetchPosts from '../../apis/post/use-fetch-posts';
import { SortType } from '../../constants/enum';
import { PostSchema, Tag } from '../../schemas/post/PostSchema';
import { Link } from 'react-router-dom';
// import { fetchPostTags } from '../../apis/post/api-action';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const PostList: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('');
  // const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [limit] = useState<number>(config.defaultConfig.limit);
  const [sort, setSort] = useState<SortType>(SortType.ASC);
  // const [optionTags, setOptionTags] = useState<Tag[]>([]);

  useEffect(() => {
    // fetchPostTags().then((res) => {
    //   if (res.success) {
    //     setOptionTags(res.tags);
    //   }
    // });
  }, []);

  const { data, error, isLoading, refetch: fetchData } = useFetchPosts(skip, limit, keyword, sort);

  const handleSearch = (value: string) => {
    setKeyword(value);
    setSkip(0); // Reset to the first page

    // Delay fetching data until the user stops typing for 1 second
    const timer = setTimeout(() => {
      fetchData();
    }, 2000); // Adjust the delay time (in milliseconds) as needed
    clearTimeout(timer);
  };

  const handlePageChange = (page: number) => {
    setSkip((page - 1) * limit);
  };

  const handleSortChange = (value: SortType) => {
    setSort(value);
  };

  // const handleFilterTag = (value: string[]) => {
  //   setSelectedTags(value);
  //   setSkip(0); // Reset to the first page
  //   fetchData(); // Fetch data when tags change
  // };

  if (isLoading) return <Spin size="large" />;
  if (error) return <Alert message="Error fetching content posts" type="error" />;

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: Tag[]) =>
        tags.map((tag) => (
          <div key={tag.id} className="border border-black my-1 w-fit p-1">
            {tag.name}
          </div>
        )),
    },
    {
      title: 'User Name',
      dataIndex: 'user',
      key: 'user_name',
      render: (user: any) => user.name,
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (createdAt: string) => new Date(createdAt).toLocaleString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: PostSchema) => (
        <Link to={`/post/${record.id}`}>View Details</Link>
      ),
    },
  ];

  return (
    <div className="h-full">
      <Title level={2}>Content Posts</Title>
      <div className="flex mb-3">
        <Search
          placeholder="Search posts"
          enterButton="Search"
          size="middle"
          style={{ width: '100%', maxWidth: '480px' }}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onSearch={handleSearch}
        />
        {/* <Select
          mode="multiple"
          placeholder="Filter by tag"
          style={{ width: 200, marginLeft: 10 }}
          value={selectedTags}
          onChange={handleFilterTag}
        >
          {optionTags.map((tag) => (
            <Option key={tag.id} value={tag.id}>
              {tag.name}
            </Option>
          ))}
        </Select> */}
        <Select
          defaultValue={SortType.ASC}
          style={{ width: 120, marginLeft: 10 }}
          value={sort}
          onChange={handleSortChange}
        >
          <Option value="ASC">Ascending</Option>
          <Option value="DESC">Descending</Option>
        </Select>
      </div>
      {data && 'success' in data && data.success && (
        <Table
          columns={columns}
          dataSource={data?.posts}
          rowKey={(record) => record.id}
          pagination={{
            current: skip / limit + 1,
            pageSize: limit,
            total: data?.total,
            onChange: handlePageChange,
          }}
        />
      )}
    </div>
  );
};

export default PostList;
