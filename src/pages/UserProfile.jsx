import React from 'react';
import { Space, ConfigProvider } from 'antd';
import { Form, Input, Upload, Button, Switch, Image} from 'antd';
import {Row, Col, Divider} from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';

const ProfileForm = ({themeConfig}) => {
  const [changeProfileForm] = Form.useForm();
  const [changePasswordForm] = Form.useForm();
  const [changeAuthSettingsForm] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values: ', values);
  };
  
  const cardStyling = {
    padding: "24px",
    backgroundColor: themeConfig.token.colorBgContainer,
    borderRadius: themeConfig.token.borderRadiusLG,
  };

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
                    style={{backgroundColor: themeConfig.token.colorBgContainer }}
                    variant='filled'
                >
                    <Row>
                    <Col className="mr-8 text-center">
                        <Image
                            width={200}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            style={{borderRadius: themeConfig.token.borderRadiusLG}}
                        />
                        <Form.Item name="avatar" valuePropName="fileList">
                            <Upload listType="picture" maxCount={1}>
                            <Button icon={<UploadOutlined />} className="mt-5 h-10" style={{
                                borderRadius: themeConfig.token.borderRadius, 
                                width: "200px"}}>
                                Выбрать файл...
                            </Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col style={{ flex: 1 }}>
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
            </div>
            <Divider orientation="left">Аутентификация</Divider>
            <Row 
            gutter={[28, 28]}
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
                                    <Switch ></Switch>
                                </div>
                                
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
            </Row>
        </Space>
    </ConfigProvider>
  );
};

export default ProfileForm;
