import React from 'react';
import { useEffect, useState } from 'react';

import { Sceleton, Space, Form, Button, DatePicker, Select, Tooltip } from 'antd';
import { getCountries, getCityById } from '../../../api/location';
import { getAuthPreferences, updateAuthPreferences } from '../../../api/user';


const UserAdditionalForm = () => {
    const [changeAdditionalForm] = Form.useForm();
    const [loading, setLoading] = useState(true);

    const handleAdditionalSubmit = (e) => {
        const formattedBirth = getDateFormatted(e.birth_date);
        const payload = {
            birth_date: formattedBirth,
            english_level: e.english_level,
        };
        changeProfile(changeAdditionalForm, payload);
    };

    const getPreferences = async () => {
        try {
            data = await getAuthPreferences();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPreferences();
    }, []);

    return (
        <Sceleton active="true" loading={loading} title="false">
            <Form
                form={changeAdditionalForm}
                layout="vertical"
                onFinish={handleAdditionalSubmit}
                style={cardStyling}
                variant='filled'
            >
                <Form.Item
                    label= "Дата рождения"
                >
                    <Space>
                        <Form.Item name="birth_date" noStyle>
                            <DatePicker placeholder='Укажите дату' className='h-10'></DatePicker>
                        </Form.Item>
                        
                        <Tooltip title="Некоторые встречи имеют возрастное ограничение" placement='right'>
                            <QuestionCircleOutlined/>
                        </Tooltip>
                    </Space>
                </Form.Item>
                <Form.Item
                    label="Уровень английского языка"
                    name="english_level"
                >
                    <Select 
                        placeholder='Выберете ваш уровень' 
                        options={langLevels}
                        className='h-10'
                    />
                </Form.Item>
                <Form.Item label="Локация">
                    <Space>
                        <Space.Compact>
                            <Form.Item
                                name={['address', 'country']}
                                noStyle
                            >
                                <Select className='h-10' placeholder="Выберете страну" showSearch>
                                    <Option value="Zhejiang">Zhejiang</Option>
                                    <Option value="Jiangsu">Jiangsu</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name={['address', 'city']}
                                noStyle
                            >
                            <Select
                                style={{
                                    width: '50%',
                                }}
                                className='h-10'
                                placeholder="Введите город"
                            />
                            </Form.Item>
                        </Space.Compact>
                        <Tooltip title="Город необходим для подбора оффлайн встреч" placement='right'>
                            <QuestionCircleOutlined/>
                        </Tooltip>
                    </Space>
                    
                </Form.Item>
                <Form.Item className="m-0">
                    <div  style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit" size='large'>
                        Сохранить
                    </Button>
                    </div>
                </Form.Item>
            </Form>
        </Sceleton>
    )
}

export default UserAdditionalForm;