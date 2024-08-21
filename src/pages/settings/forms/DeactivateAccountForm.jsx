import React from 'react';
import { useEffect, useState, useContext } from 'react';

import { Form, Alert, Button, Checkbox } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import NotificationContext from '../../../context/NotificationContext';
import useAxios from '../../../utils/UseAxios';


const DeactivateAccountForm = ({ cardStyling, themeConfig, initialData, apiFeedback }) => {
    const api = useAxios();
    const [deactivationForm] = Form.useForm();
    const {setNotification} = useContext(NotificationContext);

    const handleSubmit = async (e) => {
        console.log(e);
    };

    return (
        <Form
            form={deactivationForm}
            layout="vertical"
            style={cardStyling}
            onFinish={handleSubmit}
            variant='filled'
        >
            <Alert
                className='mb-4'
                message="Вы деактивируете свой аккаунт"
                description="Для дополнительной безопасности, рекомендуем ознакомиться с последствиями деактивации аккаунта."
                type="warning"
                icon={<WarningOutlined/>}
                showIcon
            />
            <Form.Item 
                name="confirmation"
                rules={[{ required: true, message: 'Подтверждение обязательно.' }]}
                valuePropName="checked"
            >
                <Checkbox>Я подтверждаю деактивацию аккаунта.</Checkbox>
            </Form.Item>
            <Form.Item>
                <Button type="primary"htmlType="submit" danger size='middle'>
                    Деактивировать
                </Button>
            </Form.Item>
        </Form>
    )
}

export default DeactivateAccountForm;