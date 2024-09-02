import React from 'react';
import { useEffect, useState, useContext } from 'react';

import { Skeleton, Space, Form, Button, DatePicker, Select, Tooltip } from 'antd';
import { getCountries, getCityById } from '../../../api/location';
import { updateProfile } from '../../../api/user';
import { UserOutlined, UploadOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import NotificationContext from '../../../context/NotificationContext';
import { getDateFormatted, StringToDate } from '../../../utils/DateFormatter';
import useAxios from '../../../utils/UseAxios';
import { useProfile } from '../../../hooks/useProfile';

export const langLevels = [
    {
      value: 'A0',
      label: '🍼 Ничего не знаю',
    },
    {
      value: 'A1',
      label: '👶 Начальный уровень (Начинающий)',
    },
    {
      value: 'A2',
      label: '🗣️ Основы общения (Предварительный)',
    },
    {
      value: 'B1',
      label: '💬 Средний уровень (Разговорный)',
    },
    {
      value: 'B2',
      label: '🎯 Выше среднего (Самостоятельный)',
    },
    {
      value: 'C1',
      label: '🌐 Продвинутый уровень (Продвинутый)',
    },
    {
      value: 'C2',
      label: '🏅 Профессиональный уровень (Свободный)',
    },
];

const UserAdditionalForm = ({ cardStyling, apiFeedback }) => {
    const api = useAxios();
    const [changeAdditionalForm] = Form.useForm();
    const {setNotification} = useContext(NotificationContext);
    const [loading, setLoading] = useState(true);
    const {profile, setProfile} = useProfile();
    
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [cityLoading, setCityLoading] = useState(false);

    const formatDataValues = (data) => {
        if (data) {
            const processed = {
                birth_date: StringToDate(data.birth_date),
                english_level: data.english_level,
                address: {
                    country: data.country,
                    city: data.city,
                }
            }
            return processed;
        }
        return null;
    };

    const handleSubmit = async (e) => {
        const payload = {
            birth_date: getDateFormatted(e.birth_date),
            english_level: e.english_level,
            country: e.address.country,
            city: e.address.city,
        };
        try {
            const data = await updateProfile(api, payload);
            setProfile(data);
            setNotification({
                type: 'success',
                content: 'Данные профиля обновлены.',
            });
            apiFeedback(changeAdditionalForm, []);
        } catch (error) {
            setNotification({
                type: 'error',
                content: 'Ошибка обновления профиля.',
            });
            apiFeedback(changeAdditionalForm, error.response?.data);
        }
    };

    const fetchCountries = async () => {
        try {
            const data = await getCountries(api);
            const processed = data.map(country => {
                return {
                    value: country.id,
                    label: country.name,
                };
            });
            setCountries(processed);
        } catch (error) {
            setNotification({
                type: 'error',
                content: 'Не удалось получить список стран.',
            });
            setCountries([]);
        }
    };

    const fetchCities = async (country_id) => {
        setCityLoading(true);
        try {
            const data = await getCityById(api, country_id);
            const processed = data.map(city => {
                return {
                    value: city.id,
                    label: city.name,
                };
            });
            setCities(processed);
        } catch (error) {
            setNotification({
                type: 'error',
                content: 'Не удалось получить список городов.',
            });
            setCities([]);
        } finally {
            setCityLoading(false);
        }
    };

    const onCountrySelect = async (country_id) => {
        setProfile({...profile, country: country_id, city: null});
    }

    useEffect(() => {
        const processed = formatDataValues(profile);
        if (processed) {
            changeAdditionalForm.setFieldsValue(processed);
            setLoading(false);
        }
    }, [profile]);

    useEffect(() => {
        if (profile?.country)
            fetchCities(profile.country);
    }, [profile?.country]);

    useEffect(() => {
        fetchCountries();
    }, []);

    return (
        <Skeleton active="true" loading={loading} title="false">
            <Form
                form={changeAdditionalForm}
                layout="vertical"
                onFinish={handleSubmit}
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
                                <Select 
                                    className='h-10' 
                                    placeholder="Выберете страну" 
                                    showSearch 
                                    value={profile?.country}
                                    onSelect={onCountrySelect}
                                    optionFilterProp="label"
                                    options={countries}>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name={['address', 'city']}
                                noStyle
                            >
                                <Select
                                    className='h-10'
                                    placeholder="Введите город"
                                    disabled={cityLoading ? true : undefined}
                                    loading={cityLoading ? true : undefined}
                                    showSearch
                                    value={profile?.city}
                                    optionFilterProp="label"
                                    options={cities}>
                                </Select>
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
        </Skeleton>
    )
}

export default UserAdditionalForm;