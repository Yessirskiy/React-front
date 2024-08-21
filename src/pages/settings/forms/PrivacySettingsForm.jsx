import React from 'react';
import { useEffect, useState, useContext } from 'react';

import { Row, Col, Form, Button } from 'antd';
import { updateAllPreferences } from '../../../api/user';
import RightSegmented from '../../../components/RightSegmented';
import NotificationContext from '../../../context/NotificationContext';
import useAxios from '../../../utils/UseAxios';


const PrivacySettingsForm = ({ cardStyling, themeConfig, initialData, apiFeedback }) => {
    const api = useAxios();
    const [privacySettingsForm] = Form.useForm();
    const {setNotification} = useContext(NotificationContext);
    const [loading, setLoading] = useState(true);

    const formatDataValues = (data) => {
        if (data) {
            const processed_keys = ["avatar_access", "last_name_access", "email_access", "phone_number_access"];
            const processed = {};
            Object.keys(data).forEach((key) => {
                if (processed_keys.includes(key)) {
                    processed[key] = data[key];
                }
            });
            return processed;
        }
        return null;
    };

    const handleSubmit = async (e) => {
        try {
            const data = await updateAllPreferences(api, e);
            privacySettingsForm.setFieldsValue(formatDataValues(data));
            setNotification({
                type: 'success',
                content: 'Данные профиля обновлены.',
            });
            // apiFeedback(changeProfileForm, []);
        } catch (error) {
            setNotification({
                type: 'error',
                content: 'Ошибка обновления профиля.',
            });
            // apiFeedback(changeProfileForm, error.response?.data);
        }
        
    };

    useEffect(() => {
        const processed = formatDataValues(initialData);
        if (processed) {
            privacySettingsForm.setFieldsValue(processed);
            setLoading(false);
        }
    }, [initialData]);

    return (
        <Form
            form={privacySettingsForm}
            layout="vertical"
            style={cardStyling}
            onFinish={handleSubmit}
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
                        name="avatar_access"
                        layout='horizontal'
                    >
                        <RightSegmented options={['Мне', 'Друзья', 'Все',]}/>
                    </Form.Item>

                    <Form.Item
                        label="Моя фамилия видна"
                        name="last_name_access"
                        layout='horizontal'
                    >
                        <RightSegmented options={['Мне', 'Друзья', 'Все',]}/>
                    </Form.Item>
                </Col>
                <Col 
                    className="gutter-row"
                    xs={24} sm={24} md={24}
                    lg={24} xl={12}
                >
                    <Form.Item
                        label="Моя почта видна"
                        name="email_access"
                        layout='horizontal'
                    >
                        <RightSegmented options={['Мне', 'Друзья', 'Все',]}/>
                    </Form.Item>

                    <Form.Item
                        label="Мой телефон виден"
                        name="phone_number_access"
                        layout='horizontal'
                    >
                        <RightSegmented options={['Мне', 'Друзья', 'Все',]}/>
                    </Form.Item>

                    <Form.Item className="m-0">
                        <div  style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit" size='middle'>
                            Сохранить
                        </Button>
                        </div>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default PrivacySettingsForm;