import React from 'react';
import { useState, useEffect, useContext } from 'react';

import { Form, Button, Modal } from 'antd';
import RightSwitch from '../../../components/RightSwitch';

import useAxios from '../../../utils/UseAxios';
import { updateAuthPreferences } from '../../../api/user';

import NotificationContext from '../../../context/NotificationContext';

const ChangeAuthPreferencesForm = ({ cardStyling, initialData, apiFeedback }) => {
    const api = useAxios();
    const [changeAuthPreferencesForm] = Form.useForm();
    const { setNotification } = useContext(NotificationContext);

    const [switchLoading, setSwitchLoading] = useState(true);

    const [twofaLoading, setTwofaLoading] = useState(true);
    const [twofaOpen, setTwofaOpen] = useState(false);

    useEffect(() => {
        const processed = formatDataValues(initialData);
        if (processed) {
            changeAuthPreferencesForm.setFieldsValue(processed);
            setSwitchLoading(false);
        }
    }, [initialData]);

    const formatDataValues = (data) => {
        if (data) {
            const processed = {
                notify_login: data.notify_login,
                twofa: data.twofa,
            }
            return processed;
        }
        return null;
    };

    const handleSubmit = async (e) => {
        const payload = {
            notify_login: e.notify_login,
            twofa: e.twofa,
        };
        try {
            const data = await updateAuthPreferences(api, payload);
            changeAuthPreferencesForm.setFieldsValue(formatDataValues(data));
            setNotification({
                type: 'success',
                content: 'Данные профиля обновлены.',
            });
            apiFeedback(changeAuthPreferencesForm, []);
        } catch (error) {
            setNotification({
                type: 'error',
                content: 'Ошибка обновления профиля.',
            });
            apiFeedback(changeAuthPreferencesForm, error.response?.data);
        }
        
    };

    const handleTwofaOk = () => {
        setOpen(false);
    };
    
    const handleTwofaCancel = () => {
        setOpen(false);
    };

    return (
        <Form
            form={changeAuthPreferencesForm}
            layout="vertical"
            onFinish={handleSubmit}
            style={cardStyling}
            variant='filled'
        >
            <Form.Item
                label="Получать уведомления о входе"
                name="notify_login"
                layout='horizontal'
                valuePropName="checked"
            >
                <RightSwitch loading={switchLoading ? true : undefined}/>
            </Form.Item>

            <Form.Item
                label="Двухфакторная аутентификация"
                name="twofa"
                layout='horizontal'
                valuePropName="checked"
            >
                <RightSwitch loading={switchLoading ? true : undefined}/>
            </Form.Item>
            <Modal
                title={<p>Настройка двухфакторной аутентификации</p>}
                loading={twofaLoading ? true : undefined}
                open={twofaOpen}
                onCancel={handleTwofaCancel}
                cancelText='Отмена'
                onOk={handleTwofaOk}
                okText='Подтвердить'
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>

            <Form.Item className="m-0">
                <div className='text-right'>
                    <Button type="primary" htmlType="submit" className="h-10">
                        Сохранить
                    </Button>
                </div>
            </Form.Item>
        </Form>
    )
}

export default ChangeAuthPreferencesForm;