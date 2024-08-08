import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  AppstoreOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, theme, Breadcrumb } from 'antd';

const { Header, Sider, Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedNav, setSelectedNav] = useState("meetings_new")
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
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
            { key: 'user_profile', label: 'Профиль' },
            { key: 'user_balance', label: 'Баланс' },
            { key: 'user_settings', label: 'Настройки' },
            { key: 'user_help', label: 'Помощь' },
          ]
        },
      ],
    },
  ]
  const getBreadcumpItems = () => {
    let navs = selectedNav.split("_");
    for (let group of menuItems){
      for (let subgroup of group.children){
        if (subgroup.key === navs[0]){
          for (let groupelem of subgroup.children) {
            console.log(selectedNav, navs[1])
            if (selectedNav === groupelem.key) {
              return [{title: subgroup.label}, {title: groupelem.label}];
            }
          }
        }
      }
    }
    return [];
  }


  const onMenuClick = (e) => {
    setSelectedNav(e.key);
  };
  const renderContent = () => {
    switch (selectedNav) {
      case 'meetings_new':
        return <Tab1 />;
      case 'meetings_schedule':
        return <Tab2 />;
      case 'meetings_attended':
        return <Tab3 />;
      default:
        return <Tab1 />;
    }
  };


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
          onClick={onMenuClick}
          defaultSelectedKeys={['1']}
          style={{ margin: 0 }}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          className='flex items-center gap-3'
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
          <Breadcrumb items={getBreadcumpItems()}>
          </Breadcrumb>
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
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

const Tab1 = () => <div>Content of Tab 1</div>;
const Tab2 = () => <div>Content of Tab 2</div>;
const Tab3 = () => <div>Content of Tab 3</div>;

export default App;