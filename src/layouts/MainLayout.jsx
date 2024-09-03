import React, { useState, useContext, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  AppstoreOutlined,
  FormOutlined,
  SunOutlined,
  MoonOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Typography, Avatar, Button, Layout, Menu, Breadcrumb, theme, ConfigProvider, Flex } from 'antd';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { logoutUser } from '../api/auth.js';
import { NavLink, Link } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import ruRU from 'antd/locale/ru_RU';
import dayjs from 'dayjs';

dayjs.locale('ru');


const { Header, Sider, Content } = Layout;
const { Text } = Typography;
const MainLayout = () => {
    const { logout } = useAuth();
    const [collapsed, setCollapsed] = useState(false);
    const [selectedNav, setSelectedNav] = useState("feed")
    const [isDarkMode, setIsDarkMode] = useState(false);
    let location = useLocation();   
    const { user } = useAuth();

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
                key: 'main',
                label: 'Главное',
                icon: <AppstoreOutlined />,
                children: [
                    { key: 'feed', label: <NavLink to="/feed">Лента</NavLink>},
                    { key: 'courses', label: <Link to="/courses">Потоки</Link>},
                    { key: 'news', label: <NavLink to="/news">Новости</NavLink> },
                    { key: 'meetings', label: <NavLink to="/meetings">Встречи</NavLink> },
                    { key: 'help', label: 'Помощь' },
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
                    { key: 'user_profile', label: <NavLink to="/account/profile">Профиль</NavLink>},
                    { key: 'user_balance', label: <NavLink to="/account/balance">Баланс</NavLink>},
                    { key: 'user_settings', label: <NavLink to="/account/settings">Настройки</NavLink> },
                    { key: 'user_help', label: 'Помощь' },
                ]
                },
            ],
        },
    ]
    const breadcrumbDummies = {
        "meetings": <NavLink to="/meetings">Встречи</NavLink>,
        "feed": <NavLink to="/feed">Лента</NavLink>,
        "courses": <Link to="/courses">Потоки</Link>,
        "news": <NavLink to="/news">Новости</NavLink>,
        "account": <NavLink to="/account">Аккаунт</NavLink>,
        "profile": <NavLink to="/account/profile">Профиль</NavLink>,
        "balance": <NavLink to="/account/balance">Баланс</NavLink>,
        "settings": <NavLink to="/account/settings">Настройки</NavLink>,
    };

    const getBreadcrumbItems = () => {
        let navs = location.pathname.slice(1).split("/");
        let result = [];
        for (let nav of navs){
            result.push({title: breadcrumbDummies[nav]})
        }
        if (/^\/news\/\d+$/.test(location.pathname) || /^\/meetings\/\d+$/.test(location.pathname)){
            result.pop()
            if (location.state?.name)
                result.push({title:<Link state={{name: location.state.name}} to={location.pathname}>{location.state.name}</Link>})
            else 
                result.push({title: <Link to={location.pathname}>{navs[1]}</Link>})
        }
        return result;
    }

    const onMenuClick = (e) => {
        setSelectedNav(e.key);
    };

    useEffect(() => {
        if (location.pathname.includes('/feed')) {
            setSelectedNav('feed');
        } else if (location.pathname.includes('/news')) {
            setSelectedNav('news')
        } else if (location.pathname.includes('/courses')) {
            setSelectedNav('courses');
        } else if (location.pathname.includes('/meetings')) {
            setSelectedNav('meetings');
        } else if (location.pathname.includes('/account/profile')) {
            setSelectedNav('user_profile');
        } else if (location.pathname.includes('/account/balance')) {
            setSelectedNav('user_balance');
        } else if (location.pathname.includes('/account/settings')) {
            setSelectedNav('user_settings');
        } else {
            setSelectedNav('');
        }
    }, [location.pathname]);

    const handleLogout = async (e) => {
        await logoutUser();
        logout();
        return <Navigate to="/login"/>;
    }
    
    return (
        <ConfigProvider theme={themeConfig} locale={ruRU}>
            <Layout className='h-screen'>
                <Sider trigger={null} collapsible collapsed={collapsed ? true : undefined} style={{background: themeConfig.token.colorBgContainer}}>
                    <Flex vertical className='h-full'>
                        <Flex className="m-4 items-center" style={collapsed ? {justifyContent: "center"} : undefined}>
                            <Avatar
                                src={user?.avatar}
                                shape='square'
                                size={collapsed ? 40 : 35}
                                icon={<UserOutlined />}
                                className={collapsed ? 'mr-0' : 'mr-4'}
                            />
                            {!collapsed && (
                                <Text>{user?.first_name} {user?.last_name}</Text>
                            )}
                        </Flex>
                        <Menu className='m-0' mode="inline"
                            onClick={onMenuClick}
                            selectedKeys={[selectedNav]}
                            items={menuItems}
                        />
                        <div className='mt-auto m-4 flex justify-center'>
                            <Button 
                                size='large' 
                                icon={<LogoutOutlined />} 
                                iconPosition='end'
                                className='w-full'
                                onClick={handleLogout}
                            >
                                {collapsed ? '' : 'Выйти'}
                            </Button>
                        </div>
                    </Flex>
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
                    <Breadcrumb items={getBreadcrumbItems()}/>
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
                </Header>
                <Content 
                    className='p-7 pb-0 overflow-auto no-scrollbar'
                >
                    <Outlet/>
                </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default MainLayout;