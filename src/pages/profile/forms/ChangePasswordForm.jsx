import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Form, Input, Button, Alert } from 'antd';

import NotificationContext from '../../../context/NotificationContext';

import { changeUserPassword } from '../../../api/auth';
import useAxios from '../../../utils/UseAxios';


const ChangePasswordForm = ({ cardStyling, apiFeedback }) => {
    const api = useAxios();
    const [changePasswordForm] = Form.useForm();

    const [ loading, setLoading ] = useState(false);
    const [ alert, setAlert ] = useState(null);
    const { setNotification } = useContext(NotificationContext);

    const onFinish = async (e) => {
        try {
            setLoading(true);
            const data = await changeUserPassword(api, e);
            setNotification({
                type: "success",
                content: "Пароль успешно обновлен."
            })
            apiFeedback(changePasswordForm, []);
            changePasswordForm.setFieldsValue({
                old_password: null,
                new_password1: null,
                new_password2: null,
            })
            setAlert(null);
        } catch (error) {
            setNotification({
                type: "error",
                content: "Ошибка обновления пароля."
            })
            apiFeedback(changePasswordForm, error.response?.data);
            if (error.response?.data.non_field_errors){
                setAlert(error.response.data.non_field_errors)
            }
        } finally {
            setLoading(false);
        }
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
            {alert && <Alert className='mb-5' message={alert} type="error" closable afterClose={() => {setAlert(null)}}/>}
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
                name="new_password1"
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
                name="new_password2"
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
                <Button 
                    type="primary" 
                    htmlType="submit" 
                    className="h-10"
                    loading = {loading ? true : undefined}
                >
                    Сохранить
                </Button>
                </div>
            </Form.Item>
        </Form>
    )
};

export default ChangePasswordForm;