import React from 'react';
import { useState, useEffect } from 'react';

import { Space, ConfigProvider, message } from 'antd';
import { Form, Input, Upload, Button, Switch, Image, Modal, DatePicker, Select} from 'antd';
import {Row, Col, Divider} from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import useAxios from '../utils/UseAxios';

const profileURL = "api/users/profile/";

const ProfileForm = ({themeConfig}) => {
  const [changeProfileForm] = Form.useForm();
  const [loadings, setLoadings] = useState([]);
  const [changeAdditionalForm] = Form.useForm();
  const [changePasswordForm] = Form.useForm();
  const [changeAuthSettingsForm] = Form.useForm();

  const [showLogin2FA, setShowLogin2FA] = useState(false);
  
  const [messageApi, contextHolder] = message.useMessage();
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null)

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
        changeProfileForm.setFieldsValue(response.data);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleProfileSubmit = async (e) => {
    try {
        const payload = {
            email: e.email,
            first_name: e.first_name,
            last_name: e.last_name ? e.last_name : null,
        };

        const response = await api.put(profileURL, payload, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.status === 200) {
            changeProfileForm.setFieldsValue(response.data);
        }
        setNotification({
            type: 'success',
            content: 'Данные профиля обновлены.',
        });
    } catch (error) {
        setError({
            type: 'error',
            content: 'Ошибка обновления профиля.',
        });
    }
  }

  useEffect(() => {
    if (notification) {
      messageApi.open(notification);
      setNotification(null);
    }
  }, [notification, messageApi]);

  useEffect(() => {
    if (error) {
      messageApi.open(error);
      setError(null);
    }
  }, [error, messageApi]);

  const langLevels = [
    {
      value: 'jack',
      label: 'Jack',
    },
    {
      value: 'lucy',
      label: 'Lucy',
    },
    {
      value: 'Yiminghe',
      label: 'yiminghe',
    },
    {
      value: 'disabled',
      label: 'Disabled',
      disabled: true,
    },
  ];


  return (
    <ConfigProvider theme={themeConfig}>      
        <Space className='flex' direction='vertical' size="large">
            {contextHolder}
            <Divider orientation="left">Профиль</Divider>
            <Row 
                gutter={[28, 28]}
            >
                <Col 
                    className='gutter-row'
                    xs={24} sm={24} md={24}
                    lg={12} xl={12}
                >
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
                                <Image
                                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                    style={{borderRadius: themeConfig.token.borderRadiusLG}}
                                />
                                <Form.Item name="avatar" valuePropName="fileList">
                                    <Upload listType="picture" maxCount={1}>
                                    <Button icon={<UploadOutlined />} className="mt-5 h-10">
                                        Выбрать файл...
                                    </Button>
                                    </Upload>
                                </Form.Item>
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
                                    initialValue="admin@example.com"
                                >
                                    <Input size='large'/>
                                </Form.Item>

                                <Form.Item
                                    label="Номер телефона"
                                    name="phone"
                                    rules={[{ message: 'Введите номер телефона' }]}
                                >
                                    <Input addonBefore="+7" placeholder="Введите номер телефона" size='large'/>
                                </Form.Item>

                                <Form.Item className="m-0">
                                    <div  style={{ textAlign: 'right' }}>
                                    <Button loading={loadings[0]} type="primary" htmlType="submit" size='large'>
                                        Сохранить
                                    </Button>
                                    </div>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col
                    className='gutter-row'
                    xs={24} sm={24} md={24}
                    lg={12} xl={12}
                >
                    <Form
                        form={changeAdditionalForm}
                        layout="vertical"
                        onFinish={onFinish}
                        style={cardStyling}
                        variant='filled'
                    >
                        <Form.Item
                            label="Дата рождения"
                            name="firstName"
                        >
                            <DatePicker placeholder='Укажите дату' className='h-10'></DatePicker>
                        </Form.Item>
                        <Form.Item
                            label="Уровень английского языка"
                            name="firstName"
                        >
                            <Select 
                                placeholder='Выберете ваш уровень' 
                                options={langLevels}
                                className='h-10'
                            />
                        </Form.Item>
                        <Form.Item className="m-0">
                            <div  style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit" size='large'>
                                Сохранить
                            </Button>
                            </div>
                        </Form.Item>
                    </Form>
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
                        <div style={{ flex: 1 }}>
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
                        </div>
                    </Form>
                </Col>
                <Col 
                className='gutter-row'
                xs={24} sm={24} md={24}
                lg={12} xl={12}>
                    <Form
                        form={changeAuthSettingsForm}
                        layout="vertical"
                        onFinish={onFinish}
                        style={cardStyling}
                        variant='filled'
                    >
                        <Form.Item
                            label="Получать уведомления о входе"
                            name="notify_login"
                            layout='horizontal'
                            valuePropName="checked"
                        >
                            <div className='text-right'>
                                <Switch ></Switch>
                            </div>
                            
                        </Form.Item>

                        <Form.Item
                            label="Двухфакторная аутентификация"
                            name="2fa_login"
                            layout='horizontal'
                            valuePropName="checked"
                        >
                            <div className='text-right'>
                                <Switch onChange={onTwofaChange}></Switch>
                            </div>
                            
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
    </ConfigProvider>
  );
};

export default ProfileForm;
