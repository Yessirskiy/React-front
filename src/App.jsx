import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, theme } from 'antd';
import { Breadcrumb } from 'antd';
import UserSidbar from './components/UserSidebar';

const { Header, Sider, Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className='h-screen'>
      <Sider trigger={null} collapsible collapsed={collapsed} theme='light'>
        
        <div className="demo-logo-vertical flex items-center gap-2" collapsible collapsed={collapsed}
        style={{
          height: '32px',
          margin: '16px',
          background: 'rgba(255,255,255,.2)',
          borderRadius: borderRadiusLG,
        }}>
          <Avatar shape="square" icon={<UserOutlined />} />
          Nikolai
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ margin: 0 }}
          items={[
            {
              key: 'general',
              label: 'Главное',
              type: 'group',
              children: [
                {
                  key: 'meetings',
                  label: 'Встречи',
                  icon: <AppstoreOutlined />,
                  children: [
                    { key: 'meetings_new', label: 'Новые' },
                    { key: 'meetings_schedule', label: 'Мое расписание' },
                    { key: 'meetings_attended', label: 'Посещенные' },
                    { key: 'meetings_help', label: 'Помощь' },
                  ]
                },
                {
                  key: 'blog',
                  label: 'Блог',
                  icon: <FormOutlined />,
                  children: [
                    { key: 'blog_feed', label: 'Актуальное' },
                    { key: 'blog_blogs', label: 'Мои блоги' },
                    { key: 'blog_articles', label: 'Мои статьи' },
                    { key: 'blog_help', label: 'Помощь' },
                  ]
                },
              ],
            },
            {
              key: 'settings',
              label: 'Пользовательское',
              type: 'group',
              children: [
                {
                  key: 'user',
                  label: 'Аккаунт',
                  icon: <UserOutlined />,
                  children: [
                    { key: 'settings_profile', label: 'Профиль' },
                    { key: 'settings_balance', label: 'Баланс' },
                    { key: 'settings_settings', label: 'Настройки' },
                    { key: 'settings_help', label: 'Помощь' },
                  ]
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;