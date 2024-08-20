import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Form, Input, Button } from 'antd';

import NotificationContext from '../../../context/NotificationContext';


const ChangePasswordForm = ({ cardStyling, apiFeedback }) => {
    const [changePasswordForm] = Form.useForm();
    const { setNotification } = useContext(NotificationContext);

    const onFinish = (values) => {
        console.log('Form values: ', values);
    };

    return (
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
    )
};

export default ChangePasswordForm;