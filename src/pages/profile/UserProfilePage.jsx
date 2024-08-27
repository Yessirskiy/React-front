import React from 'react';
import { useState, useEffect, useContext } from 'react';

import { Space, ConfigProvider, Row, Col, Divider, theme } from 'antd';

import useAxios from '../../utils/UseAxios';
import { getProfile, getAuthPreferences } from '../../api/user';

import UserAdditionalForm from './forms/UserAdditionalForm';
import UserProfileForm from './forms/UserProfileForm'
import ChangePasswordForm from './forms/ChangePasswordForm';
import ChangeAuthPreferencesForm from './forms/ChangeAuthPreferencesForm';
import { NotificationProvider } from '../../context/NotificationContext';
import ProfileContext from '../../context/ProfileContext';


const UserProfilePage = () => {
    const { token } = theme.useToken();
    const { profile, setProfile, getUserProfile } = useContext(ProfileContext);
    const [authPreferences, setAuthPreferences] = useState(null);

    const api = useAxios();

    const cardStyling = {
        padding: 24,
        backgroundColor: token.colorBgContainer,
        borderRadius: token.borderRadiusLG,
    };

    const getUserAuthPreferences = async () => {
        try {
            const data = await getAuthPreferences(api);
            setAuthPreferences(data);
        } catch (error) {
            setAuthPreferences(null);
        }
    };

    useEffect(() => {
        getUserProfile();
        getUserAuthPreferences();
    }, []);
    
    const handleApiFeedback = (form, errors) => {
        form.setFields(
            Object.keys(form.getFieldsValue()).map((name) => ({
                name,
                errors: [],
            }))
        );

        if (errors){
            const formattedErrors = {};

            Object.keys(errors).forEach((field) => {
                formattedErrors[field] = {
                    value: form.getFieldValue(field),
                    errors: errors[field],
                };
            });

            form.setFields(Object.keys(formattedErrors).map((field) => ({
                name: field,
                errors: formattedErrors[field].errors,
            })));
        }
    };

    return ( 
        <Space className='flex' direction='vertical' size="large">
            <Divider orientation="left">Профиль</Divider>
            <Row gutter={[28, 28]}>
                <Col 
                    className='gutter-row'
                    xs={24} sm={24} md={24}
                    lg={12} xl={12}
                >
                    <UserProfileForm 
                        cardStyling={cardStyling}
                        apiFeedback={handleApiFeedback}
                    />
                </Col>
                <Col
                    className='gutter-row'
                    xs={24} sm={24} md={24}
                    lg={12} xl={12}
                >
                    <UserAdditionalForm 
                        cardStyling={cardStyling}
                        apiFeedback={handleApiFeedback}
                    />
                </Col>
            </Row>
            
            <Divider orientation="left">Аутентификация</Divider>
            <Row 
                gutter={[28, 28]}
                className="mb-7"
            >
                <Col 
                    className='gutter-row'
                    xs={24} sm={24} md={24}
                    lg={12} xl={12}
                >
                    <ChangePasswordForm 
                        cardStyling={cardStyling}
                        apiFeedback={handleApiFeedback}
                    />
                </Col>
                <Col 
                    className='gutter-row'
                    xs={24} sm={24} md={24}
                    lg={12} xl={12}
                >
                    <ChangeAuthPreferencesForm 
                        cardStyling={cardStyling} 
                        initialData={authPreferences} 
                        apiFeedback={handleApiFeedback}
                    />
                </Col>
            </Row>
        </Space>
    );
};

export default UserProfilePage;
