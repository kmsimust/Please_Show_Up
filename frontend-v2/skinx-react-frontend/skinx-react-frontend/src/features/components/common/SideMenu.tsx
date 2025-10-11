/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import { Avatar, Layout, Menu, MenuProps } from 'antd';
import { PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { UserSchema } from '../../schemas/user/UserSchema';
import { useQueryClient } from 'react-query';
import { authTokenLocalStorage } from '../../utils/local-storage';
import { useRecoilValue } from 'recoil';
import { userState } from '../../states/user-state';

const { Content } = Layout;

interface ISideMenuProps {
  user?: UserSchema;
}

const menuItems: MenuProps['items'] = [
  {
    key: `Post`,
    icon: React.createElement(UserOutlined),
    label: 'Post',
  },
];

const SideMenu: React.FC<ISideMenuProps> = (props) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // const user = useRecoilValue(userState);

  // useEffect(() => {
  //   if (user) {
  //     console.log('user: ', user);
  //   }
  // }, [user]);

  const handleClickLogout = async () => {
    await queryClient.resetQueries(['user']);
    authTokenLocalStorage.remove();
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Layout className="h-screen">
      <Content className='h-screen'>
        <Menu
          mode="inline"
          defaultSelectedKeys={['Post']}
          items={menuItems}
          className='h-full'
        />
      </Content>

      <Content className='site-layout-background h-fit flex justify-center items-center' style={{ background: '#FFF' }}>
        <button
          type='button'
          className='hidden xl:flex gap-4 items-center p-4 mt-auto overflow-hidden w-auto default-color'
          onClick={() => { handleClickLogout(); }}
        >
          <Avatar icon={<PoweroffOutlined />} />
          <p className='typo-label-title flex-1 truncate text-left m-0'>
            Sign Out
          </p>
        </button>
      </Content>
    </Layout>
  );
};

export default SideMenu;
