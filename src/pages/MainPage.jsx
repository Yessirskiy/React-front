import React, { useState, useContext, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  AppstoreOutlined,
  FormOutlined,
  SunOutlined,
  MoonOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, Breadcrumb, theme, ConfigProvider } from 'antd';
import UserProfilePage from "./profile/UserProfilePage.jsx"
import UserSettingsPage from './settings/UserSettingsPage.jsx';
import AuthContext from '../context/AuthContext.jsx';
import { Navigate } from 'react-router-dom';
import useAxios from '../utils/UseAxios.jsx';
import BalancePage from './balance/BalancePage.jsx';


const { Header, Sider, Content } = Layout;
const MainPage = () => {
  let {user, logoutUser} = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedNav, setSelectedNav] = useState("meetings_new")
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hello, setHello] = useState("");
  let api = useAxios();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  const themeConfig = {
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: isDarkMode ? '#1677ff' : '#1677ff',
      colorBgLayout: isDarkMode ? '#31363F' : '#f5f5f5',
      colorTextBase: isDarkMode ? '#EEEEEE' : '#000000',
      colorBgContainer: isDarkMode ? '#222831' : '#ffffff',
      borderRadiusSM: 4,
      borderRadius: 6,
      borderRadiusLG: 8,
    },
  };

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
  const getBreadcrumbItems = () => {
    let navs = selectedNav.split("_");
    for (let group of menuItems){
      for (let subgroup of group.children){
        if (subgroup.key === navs[0]){
          for (let groupelem of subgroup.children) {
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

  const handleLogout = (e) => {
    logoutUser();
    return <Navigate to="/login"/>;
  }

  const renderContent = () => {
    switch (selectedNav) {
      case 'meetings_new':
        return <Tab1 />;
      case 'meetings_schedule':
        return <Tab2 />;
      case 'meetings_attended':
        return <Tab3 />;
      case 'user_profile':
        return <UserProfilePage themeConfig={themeConfig}/>;
      case 'user_balance':
        return <BalancePage/>
      case 'user_settings':
        return <UserSettingsPage themeConfig={themeConfig}/>;
      default:
        return <Tab1 />;
    }
  };

  let testHello = async () => {
    let response = await api.get('api/hello');
    if (response.status === 200)
        setHello(response.data.message);
    }

  useEffect(() => {
    testHello();
  }, []);

  return (
    <ConfigProvider theme={themeConfig}>
      <Layout className='h-screen'>
        <Sider trigger={null} collapsible="true" collapsed={collapsed ? "true" : undefined} style={{background: themeConfig.token.colorBgContainer}}>
          <div 
            className="demo-logo-vertical flex items-center gap-2" 
            collapsible="true" collapsed={collapsed ? "true" : undefined}
            style={{
              height: '32px',
              margin: '16px',
              borderRadius: themeConfig.token.borderRadius,
            }}
          >
          </div>
          <Menu className='m-0' mode="inline"
            onClick={onMenuClick}
            defaultSelectedKeys={['meetings_new']}
            items={menuItems}
          />
        </Sider>
        <Layout>
          <Header className='flex items-center gap-3 p-0' style={{background: themeConfig.token.colorBgContainer}}>
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
            <Breadcrumb items={getBreadcrumbItems()}>
            </Breadcrumb>
            <Button
              type="text"
              icon={isDarkMode ? <MoonOutlined /> : <SunOutlined />}
              onClick={toggleTheme}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <Button onClick={handleLogout}/>
            <p>{hello}</p>
          </Header>
          <Content 
            className='m-7 mb-0 h-screen overflow-scroll no-scrollbar'
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

const Tab1 = () => <div>Content of Tab 1</div>;
const Tab2 = () => <div>Content of Tab 2</div>;
const Tab3 = () => <div>Content of Tab 3</div>;

export default MainPage;