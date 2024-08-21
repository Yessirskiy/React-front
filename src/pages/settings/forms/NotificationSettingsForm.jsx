import React from 'react';
import { useEffect, useState, useContext } from 'react';

import { Row, Col, Form, Button } from 'antd';
import { updateAllPreferences } from '../../../api/user';
import RightSegmented from '../../../components/RightSegmented';
import NotificationContext from '../../../context/NotificationContext';
import useAxios from '../../../utils/UseAxios';


const NotificationSettingsForm = ({ cardStyling, themeConfig, initialData, apiFeedback }) => {
    const api = useAxios();
    const [notificationSettingsForm] = Form.useForm();
    const {setNotification} = useContext(NotificationContext);
    const [loading, setLoading] = useState(true);

    const formatDataValues = (data) => {
        if (data) {
            const processed_keys = ["feed_notify", "upcoming_notify", "news_notify", "blog_notify"];
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
            notificationSettingsForm.setFieldsValue(formatDataValues(data));
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
            notificationSettingsForm.setFieldsValue(processed);
            setLoading(false);
        }
    }, [initialData]);

    return (
        <Form
            form={notificationSettingsForm}
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
                        label="Сообщать о возможно интересных встречах"
                        name="feed_notify"
                        layout='horizontal'
                    >
                        <RightSegmented options={['Почта', 'Ничего', 'Телефон',]}/>
                    </Form.Item>

                    <Form.Item
                        label="Сообщать о предстоящих встречах"
                        name="upcoming_notify"
                        layout='horizontal'
                    >
                        <RightSegmented options={['Почта', 'Ничего', 'Телефон',]}/>
                    </Form.Item>
                </Col>
                <Col 
                    className="gutter-row"
                    xs={24} sm={24} md={24}
                    lg={24} xl={12}
                >
                    <Form.Item
                        label="Информировать о новостях клуба"
                        name="news_notify"
                        layout='horizontal'
                    >
                        <RightSegmented options={['Почта', 'Ничего', 'Телефон',]}/>
                    </Form.Item>

                    <Form.Item
                        label="Информировать о новых статьях в блоге клуба"
                        name="blog_notify"
                        layout='horizontal'
                    >
                        <RightSegmented options={['Почта', 'Ничего', 'Телефон',]}/>
                    </Form.Item>

                    <Form.Item className="m-0">
                        <div className='text-right'>
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

export default NotificationSettingsForm;