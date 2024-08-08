import React from 'react';
import { Space, Button, Form, Input, Upload, Image, Avatar, ConfigProvider } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';

const ProfileForm = ({themeConfig}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values: ', values);
  };

  return (
    <ConfigProvider theme={themeConfig}>      
        <Space className='flex' direction='vertical' size="large">
            <div className="p-6" 
                style={{ 
                borderRadius: themeConfig.token.borderRadiusLG,
                backgroundColor: themeConfig.token.colorBgContainer 
            }}>
                <h2 className='mb-4 text-base'>Профиль</h2>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    className="flex"
                    style={{alignItems: 'flex-start', backgroundColor: themeConfig.token.colorBgContainer }}
                >
                    <div className="mr-8 text-center">
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
                    </div>
                    <div style={{ flex: 1 }}>
                        <Form.Item
                            label="Имя"
                            name="firstName"
                            rules={[{ required: true, message: 'Введите ваше имя' }]}
                        >
                            <Input placeholder="Введите ваше имя" className="h-10"/>
                        </Form.Item>

                        <Form.Item
                            label="Фамилия"
                            name="lastName"
                            rules={[{ message: 'Введите вашу фамилию' }]}
                        >
                            <Input placeholder="Введите вашу фамилию" className="h-10" />
                        </Form.Item>

                        <Form.Item
                            label="Почта"
                            name="email"
                            rules={[{required: true, message: 'Введите вашу почту'}]}
                            initialValue="admin@example.com"
                        >
                            <Input className="h-10"/>
                        </Form.Item>

                        <Form.Item
                            label="Номер телефона"
                            name="phone"
                            rules={[{ message: 'Введите номер телефона' }]}
                        >
                            <Input placeholder="Введите номер телефона" className="h-10"/>
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
            </div>
            <div className="p-6 mb-7" 
                style={{ 
                borderRadius: themeConfig.token.borderRadiusLG,
                backgroundColor: themeConfig.token.colorBgContainer 
            }}>
                <h2 className='mb-4 text-base'>Профиль</h2>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    className="flex"
                    style={{alignItems: 'flex-start', backgroundColor: themeConfig.token.colorBgContainer }}
                >
                    <div className="mr-8 text-center">
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
                    </div>
                    <div style={{ flex: 1 }}>
                        <Form.Item
                            label="Имя"
                            name="firstName"
                            rules={[{ required: true, message: 'Введите ваше имя' }]}
                        >
                            <Input placeholder="Введите ваше имя" className="h-10"/>
                        </Form.Item>

                        <Form.Item
                            label="Фамилия"
                            name="lastName"
                            rules={[{ message: 'Введите вашу фамилию' }]}
                        >
                            <Input placeholder="Введите вашу фамилию" className="h-10" />
                        </Form.Item>

                        <Form.Item
                            label="Почта"
                            name="email"
                            rules={[{required: true, message: 'Введите вашу почту'}]}
                            initialValue="admin@example.com"
                        >
                            <Input className="h-10"/>
                        </Form.Item>

                        <Form.Item
                            label="Номер телефона"
                            name="phone"
                            rules={[{ message: 'Введите номер телефона' }]}
                        >
                            <Input placeholder="Введите номер телефона" className="h-10"/>
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
            </div>
        </Space>
    </ConfigProvider>
  );
};

export default ProfileForm;
