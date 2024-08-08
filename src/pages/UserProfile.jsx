import React from 'react';
import { Button, Form, Input, Upload, Avatar } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';

const ProfileForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values: ', values);
  };

  return (
    <div>
      <h2 className='mb-4 text-base'>Профиль</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ display: 'flex', alignItems: 'flex-start' }}
      >
        <div style={{ marginRight: '30px', textAlign: 'center' }}>
          <Avatar shape="square" size={120} icon={<UserOutlined />} style={{ marginBottom: '20px', backgroundColor: '#e6f7ff' }} />
          <Form.Item name="avatar" valuePropName="fileList">
            <Upload listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />} disabled>
                Выбрать файл...
              </Button>
            </Upload>
          </Form.Item>
        </div>
        <div style={{ flex: 1 }}>
          <Form.Item
            label="Введите ваше имя"
            name="firstName"
            rules={[{ required: true, message: 'Введите ваше имя' }]}
          >
            <Input placeholder="Введите ваше имя" />
          </Form.Item>

          <Form.Item
            label="Введите вашу фамилию"
            name="lastName"
            rules={[{ required: true, message: 'Введите вашу фамилию' }]}
          >
            <Input placeholder="Введите вашу фамилию" />
          </Form.Item>

          <Form.Item
            label="Почта"
            name="email"
            initialValue="admin@example.com"
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Номер телефона"
            name="phone"
            rules={[{ required: true, message: 'Введите номер телефона' }]}
          >
            <Input placeholder="Введите номер телефона" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#e6f7ff', color: '#000' }}>
              Сохранить
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default ProfileForm;
