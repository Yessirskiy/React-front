import React from 'react';
import { useState, useEffect } from 'react';
import { NotificationProvider } from '../../context/NotificationContext';

import { Space, ConfigProvider, Divider } from 'antd';

import NotificationSettingsForm from './forms/NotificationSettingsForm';
import PrivacySettingsForm from './forms/PrivacySettingsForm';
import DeactivateAccountForm from './forms/DeactivateAccountForm';

import { getAllPreferences } from '../../api/user';
import useAxios from '../../utils/UseAxios';


const UserSettingsPage = ({themeConfig}) => {
    const api = useAxios();
    const [preferences, setPreferences] = useState(null);

    const cardStyling = {
        padding: 24,
        backgroundColor: themeConfig.token.colorBgContainer,
        borderRadius: themeConfig.token.borderRadiusLG,
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
        <ConfigProvider theme={themeConfig}> 
            <NotificationProvider>
                <Space className='flex' direction='vertical' size="large">
                    <Divider orientation="left">Настройки уведомлений</Divider>
                    <NotificationSettingsForm cardStyling={cardStyling} initialData={preferences}/>
                    <Divider orientation="left">Настройки конфиденциальности</Divider>
                    <PrivacySettingsForm cardStyling={cardStyling} initialData={preferences}/>
                    <Divider orientation="left">Деактивация аккаунта</Divider>
                    <DeactivateAccountForm cardStyling={cardStyling}/>
                </Space>
            </NotificationProvider>
        </ConfigProvider>
    );
};

export default UserSettingsPage;
