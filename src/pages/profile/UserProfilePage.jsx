import React from 'react';
import { useState, useEffect } from 'react';
import { NotificationProvider } from '../../context/NotificationContext';

import { Flex, Space, ConfigProvider, message } from 'antd';
import { Form, Input, Upload, Button, Switch, Image, Modal, DatePicker, Select, Tooltip } from 'antd';
import { Row, Col, Divider, Skeleton } from 'antd';
import { UserOutlined, UploadOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import useAxios from '../../utils/UseAxios';
import AvatarUploader from './AvatarUpload';
import dayjs from 'dayjs';

import UserAdditionalForm from './forms/UserAdditionalForm';

const profileURL = "api/users/profile/";
const authPreferencesURL = "api/users/preferences/auth/";

const ProfileForm = ({themeConfig}) => {
  const [changeProfileForm] = Form.useForm();
  const [profile, setProfile] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [showProfileLoading, setShowProfileLoading] = useState(true);

  const [changePasswordForm] = Form.useForm();
  const [changeAuthPreferencesForm] = Form.useForm();

  const [showLogin2FA, setShowLogin2FA] = useState(false);

  let api = useAxios();

  const onFinish = (values) => {
    console.log('Form values: ', values);
  };

  const cardStyling = {
    padding: "24px",
    backgroundColor: themeConfig.token.colorBgContainer,
    borderRadius: themeConfig.token.borderRadiusLG,
  };

  const onTwofaChange = (checked) => {
    setShowLogin2FA(checked);
    if (checked)
        showLoading();
  };

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    setTimeout(() => {
    setLoading(false);
    }, 2000);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const getProfile = async () => {
    let response = await api.get(profileURL);
    if (response.status === 200){
        if (response.data.avatar) {
            setProfileImg(response.data.avatar);
            delete response.data.avatar;
        }
        changeProfileForm.setFieldsValue(response.data);
        setProfile(response.data);
    }
    setShowProfileLoading(false);
  };

  const changeProfile = async (form, payload) => {
    try {
        const response = await api.put(profileURL, payload, {
            headers: {
                'Content-Type': 'application/json',
            }
        }); 
        if (response.status === 200) {
            let new_data = response.data;
            if (new_data.birth_date)
                new_data.birth_date = dayjs(new_data.birth_date);
            if (new_data.avatar){
                setProfileImg(new_data.avatar);
                delete new_data.avatar;
            }
            form.setFieldsValue(new_data);
        }
        // setNotification({
        //     type: 'success',
        //     content: 'Данные профиля обновлены.',
        // });
        handleApiFeedback(form, null);
    } catch (error) {
        // setNotification({
        //     type: 'error',
        //     content: 'Ошибка обновления профиля.',
        // });
        if (error.response.status === 400) {
            handleApiFeedback(form, error.response.data);
        }
    }
  };

  const getAuthPreferences = async () => {
    let response = await api.get(authPreferencesURL);
    if (response.status === 200){
        changeAuthPreferencesForm.setFieldsValue(response.data);
    }
    setShowProfileLoading(false);
  }

  const changeAuthPreferences = async (form, payload) => {
    try {
        const response = await api.put(authPreferencesURL, payload, {
            headers: {
                'Content-Type': 'application/json',
            }
        }); 
        if (response.status === 200) {
            let new_data = response.data;
            form.setFieldsValue(new_data);
        }
        // setNotification({
        //     type: 'success',
        //     content: 'Данные профиля обновлены.',
        // });
        handleApiFeedback(form, null);
    } catch (error) {
        // setNotification({
        //     type: 'error',
        //     content: 'Ошибка обновления профиля.',
        // });
        if (error.response.status === 400) {
            handleApiFeedback(form, error.response.data);
        }
    }
  }

  useEffect(() => {
    getProfile();
    getAuthPreferences();
  }, []);

  const handleProfileSubmit = (e) => {
    const payload = {
        email: e.email,
        first_name: e.first_name,
        last_name: e.last_name ? e.last_name : null,
        phone_number: e.phone_number ? e.phone_number: null,
    };
    changeProfile(changeProfileForm, payload);
  };

  const handleAuthPreferencesSubmit = (e) => {
    changeAuthPreferences(changeAuthPreferencesForm, e);
  }
  
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

  const RightSwitch = (props) => {
    return (
        <div className='text-right'>
            <Switch {...props}></Switch>
        </div>
    )
  };

  return (
    <ConfigProvider theme={themeConfig}>      
        <NotificationProvider>
            <Space className='flex' direction='vertical' size="large">
                <Divider orientation="left">Профиль</Divider>
                <Row 
                    gutter={[28, 28]}
                >
                    <Col 
                        className='gutter-row'
                        xs={24} sm={24} md={24}
                        lg={12} xl={12}
                    >
                        <Skeleton active="true" loading={showProfileLoading} title="false">
                            <Form
                                form={changeProfileForm}
                                layout="vertical"
                                onFinish={handleProfileSubmit}
                                style={cardStyling}
                                variant='filled'
                            >
                                <Row
                                gutter={[24, 24]}
                                >
                                    <Col 
                                    className="text-center gutter-row"
                                    xs={24} sm={24} md={12}
                                    lg={10} xl={10}>
                                        <AvatarUploader profileImg={profileImg} borderRadius={themeConfig.token.borderRadius}/>
                                    </Col>
                                    <Col 
                                    className="gutter-row"
                                    xs={24} sm={24} md={12}
                                    lg={14} xl={14}>
                                        <Form.Item
                                            label="Имя"
                                            name="first_name"
                                            rules={[{ required: true, message: 'Введите ваше имя' }]}
                                        >
                                            <Input placeholder="Введите ваше имя" size='large'/>
                                        </Form.Item>
                                        <Form.Item
                                            label="Фамилия"
                                            name="last_name"
                                            rules={[{ message: 'Введите вашу фамилию' }]}
                                        >
                                            <Input placeholder="Введите вашу фамилию" size='large' />
                                        </Form.Item>

                                        <Form.Item
                                            label="Почта"
                                            name="email"
                                            rules={[{required: true, message: 'Введите вашу почту'}]}
                                        >
                                            <Input size='large'/>
                                        </Form.Item>

                                        <Form.Item
                                            label="Номер телефона"
                                            name="phone_number"
                                        >
                                            <Input placeholder="Введите номер телефона" size='large'/>
                                        </Form.Item>

                                        <Form.Item className="m-0">
                                            <div  style={{ textAlign: 'right' }}>
                                                <Button type="primary" htmlType="submit" size='large'>
                                                    Сохранить
                                                </Button>
                                            </div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Skeleton>
                    </Col>
                    <Col
                        className='gutter-row'
                        xs={24} sm={24} md={24}
                        lg={12} xl={12}
                    >
                        <UserAdditionalForm cardStyling={cardStyling} initialData={profile}/>
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
                    lg={12} xl={12}>
                        <Form
                            form={changePasswordForm}
                            layout="vertical"
                            onFinish={onFinish}
                            style={cardStyling}
                            variant='filled'
                        >
                            <h3 className="mb-5 text-center font-medium">Изменение пароля</h3>
                            <Form.Item
                                name="old_password"
                                label="Старый пароль"
                                rules={[
                                {
                                    required: true,
                                    message: 'Введите старый пароль.',
                                },
                                ]}
                                hasFeedback
                            >
                                <Input.Password placeholder='Введите старый пароль' size='large'/>
                            </Form.Item>

                            <Form.Item
                                name="password1"
                                label="Новый пароль"
                                rules={[
                                {
                                    required: true,
                                    message: 'Введите новый пароль.',
                                },
                                ]}
                                hasFeedback
                            >
                                <Input.Password placeholder='Введите новый пароль' size='large'/>
                            </Form.Item>

                            <Form.Item
                                name="password2"
                                label="Новый пароль (подтверждение)"
                                rules={[
                                {
                                    required: true,
                                    message: 'Введите новый пароль (подтверждение).',
                                },
                                ]}
                                hasFeedback
                            >
                                <Input.Password placeholder='Введите новый пароль (подтверждение)' size='large'/>
                            </Form.Item>

                            <Form.Item className="m-0">
                                <div  style={{ textAlign: 'right' }}>
                                <Button type="primary" htmlType="submit" className="h-10">
                                    Сохранить
                                </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col 
                    className='gutter-row'
                    xs={24} sm={24} md={24}
                    lg={12} xl={12}>
                        <Form
                            form={changeAuthPreferencesForm}
                            layout="vertical"
                            onFinish={handleAuthPreferencesSubmit}
                            style={cardStyling}
                            variant='filled'
                        >
                            <Form.Item
                                label="Получать уведомления о входе"
                                name="notify_login"
                                layout='horizontal'
                                valuePropName="checked"
                            >
                                <RightSwitch/>
                            </Form.Item>

                            <Form.Item
                                label="Двухфакторная аутентификация"
                                name="twofa"
                                layout='horizontal'
                                valuePropName="checked"
                            >
                                <RightSwitch/>
                            </Form.Item>
                            <Modal
                                title={<p>Настройка двухфакторной аутентификации</p>}
                                loading={loading}
                                open={open}
                                onCancel={handleCancel}
                                cancelText='Отмена'
                                onOk={handleOk}
                                okText='Подтвердить'
                            >
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                            </Modal>

                            <Form.Item className="m-0">
                                <div  style={{ textAlign: 'right' }}>
                                <Button type="primary" htmlType="submit" className="h-10">
                                    Сохранить
                                </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Space>
        </NotificationProvider>
    </ConfigProvider>
  );
};

export default ProfileForm;
