import React from 'react';
import { useEffect, useState, useContext } from 'react';

import { Skeleton, Row, Col, Form, Button, Input, theme } from 'antd';
import AvatarUploader from '../AvatarUpload';
import { updateProfile } from '../../../api/user';
import NotificationContext from '../../../context/NotificationContext';
import useAxios from '../../../utils/UseAxios';
import { useProfile } from '../../../hooks/useProfile';


const UserAdditionalForm = ({ cardStyling, apiFeedback }) => {
    const api = useAxios();
    const { token } = theme.useToken();
    const [changeProfileForm] = Form.useForm();
    const {profile, setProfile} = useProfile();
    const {setNotification} = useContext(NotificationContext);
    const [loading, setLoading] = useState(true);

    const formatDataValues = (data) => {
        if (data) {
            const processed = {
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                phone_number: data.phone_number,
            }
            return processed;
        }
        return null;
    };

    const handleSubmit = async (e) => {
        const payload = {
            email: e.email,
            first_name: e.first_name,
            last_name: e.last_name ? e.last_name : null,
            phone_number: e.phone_number ? e.phone_number: null,
        };
        try {
            const data = await updateProfile(api, payload);
            setProfile(data);
            setNotification({
                type: 'success',
                content: 'Данные профиля обновлены.',
            });
            apiFeedback(changeProfileForm, []);
        } catch (error) {
            setNotification({
                type: 'error',
                content: 'Ошибка обновления профиля.',
            });
            apiFeedback(changeProfileForm, error.response?.data);
        }
    };

    useEffect(() => {
        const processed = formatDataValues(profile);
        if (processed) {
            changeProfileForm.setFieldsValue(processed);
            setLoading(false);
        }
    }, [profile]);

    return (
        <Skeleton active="true" loading={loading} title="false">
            <Form
                form={changeProfileForm}
                layout="vertical"
                onFinish={handleSubmit}
                style={cardStyling}
                variant='filled'
            >
                <Row
                    gutter={[24, 24]}
                >
                    <Col 
                        className="text-center gutter-row"
                        xs={24} sm={24} md={12}
                        lg={10} xl={10}
                    >
                        <AvatarUploader 
                            borderRadius={token.borderRadius}
                            profile={profile}
                            setProfile={setProfile}    
                        />
                    </Col>
                    <Col 
                        className="gutter-row"
                        xs={24} sm={24} md={12}
                        lg={14} xl={14}
                    >
                        <Form.Item
                            label="Имя"
                            name="first_name"
                            rules={[{ required: true, message: 'Введите ваше имя' }]}
                        >
                            <Input placeholder="Введите ваше имя" size='large'/>
                        </Form.Item>
                        <Form.Item
                            label="Фамилия"
                            name="last_name"
                            rules={[{ message: 'Введите вашу фамилию' }]}
                        >
                            <Input placeholder="Введите вашу фамилию" size='large' />
                        </Form.Item>

                        <Form.Item
                            label="Почта"
                            name="email"
                            rules={[{required: true, message: 'Введите вашу почту'}]}
                        >
                            <Input size='large'/>
                        </Form.Item>

                        <Form.Item
                            label="Номер телефона"
                            name="phone_number"
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
        </Skeleton>
    )
}

export default UserAdditionalForm;