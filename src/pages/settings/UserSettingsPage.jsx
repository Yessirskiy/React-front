import React from 'react';
import { useState, useEffect } from 'react';
import { NotificationProvider } from '../../context/NotificationContext';

import { Space, ConfigProvider, Divider, theme } from 'antd';

import NotificationSettingsForm from './forms/NotificationSettingsForm';
import PrivacySettingsForm from './forms/PrivacySettingsForm';
import DeactivateAccountForm from './forms/DeactivateAccountForm';

import { getAllPreferences } from '../../api/user';
import useAxios from '../../utils/UseAxios';


const UserSettingsPage = () => {
    const api = useAxios();
    const { token } = theme.useToken();
    const [preferences, setPreferences] = useState(null);

    const cardStyling = {
        padding: 24,
        backgroundColor: token.colorBgContainer,
        borderRadius: token.borderRadiusLG,
    };

    const getPreferences = async () => {
        try {
            const data = await getAllPreferences(api);
            setPreferences(data);
        } catch (error) {
            setPreferences(null);
        }
    }

    useEffect(() => {
        getPreferences();
    }, []);

    return (
        <Space className='flex' direction='vertical' size="large">
            <Divider orientation="left">Настройки уведомлений</Divider>
            <NotificationSettingsForm cardStyling={cardStyling} initialData={preferences}/>
            <Divider orientation="left">Настройки конфиденциальности</Divider>
            <PrivacySettingsForm cardStyling={cardStyling} initialData={preferences}/>
            <Divider orientation="left">Деактивация аккаунта</Divider>
            <DeactivateAccountForm cardStyling={cardStyling}/>
        </Space>
    );
};

export default UserSettingsPage;
