import React from 'react';
import {useState} from 'react';

import { Space, ConfigProvider } from 'antd';
import { Form, Input, Upload, Button, Switch, Image, Modal, Popconfirm} from 'antd';
import {Row, Col, Divider} from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';

const ProfileForm = ({themeConfig}) => {
  const [changeProfileForm] = Form.useForm();
  const [changePasswordForm] = Form.useForm();
  const [changeAuthSettingsForm] = Form.useForm();

  const [showLogin2FA, setShowLogin2FA] = useState(false);

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
  }

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const text = 'Отключение двухфакторной аутентификации ослабит безопасность.';
  const description = 'Отключить?';
  const buttonWidth = 80;

  return (
    <ConfigProvider theme={themeConfig}>      
        <Space className='flex' direction='vertical' size="large">
            <Divider orientation="left">Профиль</Divider>
            <div className="p-6" 
                style={{ 
                borderRadius: themeConfig.token.borderRadiusLG,
                backgroundColor: themeConfig.token.colorBgContainer 
            }}>
                <Form
                    form={changeProfileForm}
                    layout="vertical"
                    onFinish={onFinish}
                    variant='filled'
                >
                    <Row
                    gutter={[24, 24]}
                    >
                        <Col 
                        className="text-center gutter-row"
                        xs={24} sm={24} md={10}
                        lg={8} xl={4}>
                            <Image
                                // width={200}
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                style={{borderRadius: themeConfig.token.borderRadiusLG}}
                            />
                            <Form.Item name="avatar" valuePropName="fileList">
                                <Upload listType="picture" maxCount={1}>
                                <Button icon={<UploadOutlined />} className="mt-5 h-10" style={{
                                    borderRadius: themeConfig.token.borderRadius, 
                                    width: '100%'}}>
                                    Выбрать файл...
                                </Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col 
                        className="gutter-row"
                        xs={24} sm={24} md={14}
                        lg={16} xl={20}>
                            <Form.Item
                                label="Имя"
                                name="firstName"
                                rules={[{ required: true, message: 'Введите ваше имя' }]}
                            >
                                <Input placeholder="Введите ваше имя" size='large'/>
                            </Form.Item>

                            <Form.Item
                                label="Фамилия"
                                name="lastName"
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
                                <Button type="primary" htmlType="submit" size='large'>
                                    Сохранить
                                </Button>
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
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
                        <div style={{ flex: 1 }}>
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
                        </div>
                    </Form>
                </Col>
            </Row>
        </Space>
    </ConfigProvider>
  );
};

export default ProfileForm;
