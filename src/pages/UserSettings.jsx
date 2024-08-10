import React from 'react';
import {useState} from 'react';

import { Space, ConfigProvider } from 'antd';
import { Form, Input, Upload, Button, Switch, Segmented} from 'antd';
import {Row, Col, Divider} from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';

const SettingsForm = ({themeConfig}) => {
  const [notificationsForm] = Form.useForm();
  const [privacyForm] = Form.useForm();

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
            <Divider orientation="left">Настройки уведомлений</Divider>
            <div 
                className="p-6" 
                style={{ 
                borderRadius: themeConfig.token.borderRadiusLG,
                backgroundColor: themeConfig.token.colorBgContainer 
            }}
            >
                <Form
                    form={notificationsForm}
                    layout="vertical"
                    onFinish={onFinish}
                    variant='filled'
                >
                    <Row
                        gutter={[30, 0]}
                    >
                        <Col 
                            className="gutter-row"
                            xs={24} sm={24} md={24}
                            lg={24} xl={12}
                        >
                            <Form.Item
                                label="Сообщать о возможно интересных встречах"
                                name="notify_login"
                                layout='horizontal'
                                valuePropName="checked"
                            >
                                <div className='text-right'>
                                    <Segmented
                                        options={['Почта', 'Телефон',]}
                                        onChange={(value) => {
                                        console.log(value);
                                        }}
                                    />
                                </div>
                            </Form.Item>

                            <Form.Item
                                label="Сообщать о предстоящих встречах"
                                name="notify_login"
                                layout='horizontal'
                                valuePropName="checked"
                            >
                                <div className='text-right'>
                                    <Segmented
                                        options={['Почта', 'Телефон',]}
                                        onChange={(value) => {
                                        console.log(value);
                                        }}
                                    />
                                </div>
                            </Form.Item>
                        </Col>
                        <Col 
                            className="gutter-row"
                            xs={24} sm={24} md={24}
                            lg={24} xl={12}
                        >
                            <Form.Item
                                label="Информировать о новостях клуба"
                                name="notify_login"
                                layout='horizontal'
                                valuePropName="checked"
                            >
                                <div className='text-right'>
                                    <Segmented
                                        options={['Почта', 'Телефон',]}
                                        onChange={(value) => {
                                        console.log(value);
                                        }}
                                    />
                                </div>
                            </Form.Item>

                            <Form.Item
                                label="Информировать о новых статьях в блоге клуба"
                                name="notify_login"
                                layout='horizontal'
                                valuePropName="checked"
                            >
                                <div className='text-right'>
                                    <Segmented
                                        options={['Почта', 'Телефон',]}
                                        onChange={(value) => {
                                        console.log(value);
                                        }}
                                    />
                                </div>
                            </Form.Item>

                            <Form.Item className="m-0">
                                <div  style={{ textAlign: 'right' }}>
                                <Button type="primary" htmlType="submit" className="h-10">
                                    Сохранить
                                </Button>
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
            <Divider orientation="left">Настройки конфиденциальности</Divider>
            <div 
                className="p-6" 
                style={{ 
                borderRadius: themeConfig.token.borderRadiusLG,
                backgroundColor: themeConfig.token.colorBgContainer 
            }}
            >
                <Form
                    form={privacyForm}
                    layout="vertical"
                    onFinish={onFinish}
                    variant='filled'
                >
                    <Row 
                        gutter={[30, 0]}
                    >
                        <Col 
                            className="gutter-row"
                            xs={24} sm={24} md={24}
                            lg={24} xl={12}
                        >
                            <Form.Item
                                label="Моя фотография видна"
                                name="notify_login"
                                layout='horizontal'
                                valuePropName="checked"
                            >
                                <div className='text-right'>
                                    <Segmented
                                        options={['Мне', 'Друзьям', 'Всем',]}
                                        onChange={(value) => {
                                        console.log(value);
                                        }}
                                    />
                                </div>
                            </Form.Item>

                            <Form.Item
                                label="Моя фамилия видна"
                                name="notify_login"
                                layout='horizontal'
                                valuePropName="checked"
                            >
                                <div className='text-right'>
                                    <Segmented
                                        options={['Мне', 'Друзьям', 'Всем',]}
                                        onChange={(value) => {
                                        console.log(value);
                                        }}
                                    />
                                </div>
                            </Form.Item>
                        </Col>
                        <Col 
                            className="gutter-row"
                            xs={24} sm={24} md={24}
                            lg={24} xl={12}
                        >
                            <Form.Item
                                label="Моя почта видна"
                                name="notify_login"
                                layout='horizontal'
                                valuePropName="checked"
                            >
                                <div className='text-right'>
                                    <Segmented
                                        options={['Мне', 'Друзьям', 'Всем',]}
                                        onChange={(value) => {
                                        console.log(value);
                                        }}
                                    />
                                </div>
                            </Form.Item>

                            <Form.Item
                                label="Мой телефон виден"
                                name="notify_login"
                                layout='horizontal'
                                valuePropName="checked"
                            >
                                <div className='text-right'>
                                    <Segmented
                                        options={['Мне', 'Друзьям', 'Всем',]}
                                        onChange={(value) => {
                                        console.log(value);
                                        }}
                                    />
                                </div>
                            </Form.Item>

                            <Form.Item className="m-0">
                                <div  style={{ textAlign: 'right' }}>
                                <Button type="primary" htmlType="submit" className="h-10">
                                    Сохранить
                                </Button>
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
            <Divider orientation="left">Настройки конфиденциальности</Divider>
            <div 
                className="p-6" 
                style={{ 
                borderRadius: themeConfig.token.borderRadiusLG,
                backgroundColor: themeConfig.token.colorBgContainer 
            }}
            >
                <Form
                    form={privacyForm}
                    layout="vertical"
                    onFinish={onFinish}
                    variant='filled'
                >
                    <Row 
                        gutter={[30, 0]}
                    >
                        <Col 
                            className="gutter-row"
                            xs={24} sm={24} md={24}
                            lg={24} xl={12}
                        >
                            <Form.Item
                                label="Моя фотография видна"
                                name="notify_login"
                                layout='horizontal'
                                valuePropName="checked"
                            >
                                <div className='text-right'>
                                    <Segmented
                                        options={['Мне', 'Друзьям', 'Всем',]}
                                        onChange={(value) => {
                                        console.log(value);
                                        }}
                                    />
                                </div>
                            </Form.Item>

                            <Form.Item
                                label="Моя фамилия видна"
                                name="notify_login"
                                layout='horizontal'
                                valuePropName="checked"
                            >
                                <div className='text-right'>
                                    <Segmented
                                        options={['Мне', 'Друзьям', 'Всем',]}
                                        onChange={(value) => {
                                        console.log(value);
                                        }}
                                    />
                                </div>
                            </Form.Item>
                        </Col>
                        <Col 
                            className="gutter-row"
                            xs={24} sm={24} md={24}
                            lg={24} xl={12}
                        >
                            <Form.Item
                                label="Моя почта видна"
                                name="notify_login"
                                layout='horizontal'
                                valuePropName="checked"
                            >
                                <div className='text-right'>
                                    <Segmented
                                        options={['Мне', 'Друзьям', 'Всем',]}
                                        onChange={(value) => {
                                        console.log(value);
                                        }}
                                    />
                                </div>
                            </Form.Item>

                            <Form.Item
                                label="Мой телефон виден"
                                name="notify_login"
                                layout='horizontal'
                                valuePropName="checked"
                            >
                                <div className='text-right'>
                                    <Segmented
                                        options={['Мне', 'Друзьям', 'Всем',]}
                                        onChange={(value) => {
                                        console.log(value);
                                        }}
                                    />
                                </div>
                            </Form.Item>

                            <Form.Item className="m-0">
                                <div  style={{ textAlign: 'right' }}>
                                <Button type="primary" htmlType="submit" className="h-10">
                                    Сохранить
                                </Button>
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Space>
    </ConfigProvider>
  );
};

export default SettingsForm;
