import React, { useContext, useState, useEffect } from "react";
import useAxios from "../../utils/UseAxios";
import { getMeeting } from "../../api/meetings";
import { useParams } from "react-router-dom";
import NotificationContext from "../../context/NotificationContext";
import { UserOutlined } from '@ant-design/icons';
import { Row, Col, Card, Flex, Space, Typography, Descriptions, Tooltip, Progress, Avatar } from "antd";
import duration from 'dayjs/plugin/duration';
import { durationFormat } from "../../utils/DateFormatter";
import 'dayjs/locale/ru'
import dayjs from "dayjs";

dayjs.locale('ru');
dayjs.extend(duration);

const { Title, Text } = Typography;

const dateFormat = "HH:mm, D MMMM YYYY";

const MeetingPage = () => {
    const api = useAxios();
    const params = useParams();
    const [meeting, setMeeting] = useState(null);
    const [meetingDuration, setMeetingDuration] = useState(null);
    const [meetingLoading, setMeetingLoading] = useState(true);
    const { setNotification } = useContext(NotificationContext);

    const retrieveMeeting = async () => {
        setMeetingLoading(true);
        try {
            const data = await getMeeting(api, params.meetingId);
            setMeeting(data);
            setMeetingDuration(dayjs.duration(dayjs(data.meeting_end_date).diff(dayjs(data.meeting_start_date))));
            console.log(dayjs.duration(dayjs(data.meeting_end_date).diff(dayjs(data.meeting_start_date))));
            setMeetingLoading(false);
        } catch (error) {
            setNotification({
                type: "error",
                content: "Не удалось получить встречу."
            });
        }
    }

    useEffect(() => {
        retrieveMeeting();
    }, []);

    const infoItems = [
        {
            key: "topic",
            label: "Тема",
            children: meeting?.topic,
        },
        {
            key: "format",
            label: <Tooltip title="Подробнее далее">Формат</Tooltip>,
            children: meeting?.is_online ? "Онлайн" : "Оффлайн"
        }
    ];

    const timeItems = [
        {
            key: "meeting_start_date",
            label: "Время начала",
            children: dayjs(meeting?.meeting_start_date).format(dateFormat)
        },
        {
            key: "meeting_end_date",
            label: "Время окончания",
            children: dayjs(meeting?.meeting_end_date).format(dateFormat)
        },
        {
            key: "meeting_duration",
            label: "Продолжительность",
            children: meetingDuration?.format(durationFormat(meetingDuration))
        }
    ]

    const recomendationItems = [
        {
            key: "english_level",
            label: <Tooltip title="Рекомендованный уровень владения языком">Уровень английского</Tooltip>,
            children: meeting?.english_level,
        },
        {
            key: "age",
            label: <Tooltip title="Ограничения по возрасту">Возраст</Tooltip>,
            children: `${meeting?.min_age}+`,
        },
    ]

    return (
    <>
    <Row
        justify="center"
    >
        <Col
            xs={24} sm={22} md={22} 
            lg={20} xl={18} xxl={16}
        >
            <Title level={2} >{meeting?.title}</Title>
            <Flex vertical gap="large">
                <Row gutter={[24, 24]} gap="large">
                    <Col 
                        xs={24} sm={24} md={16} 
                        lg={16} xl={16}
                    >
                        <Card className="h-full">
                            <Descriptions title="Общая информация" layout="vertical" items={infoItems}/>
                        </Card>
                    </Col>
                    <Col
                        xs={24} sm={24} md={8} 
                        lg={8} xl={8}
                    >
                        <Card className="h-full">
                            <Flex vertical gap='middle' align="center">
                                <Progress 
                                    percent={meeting?.attendants.length / meeting?.max_attendants * 100} 
                                    type="dashboard" 
                                    format={() => `${meeting?.attendants.length}/${meeting?.max_attendants}`}
                                />
                                <Flex wrap gap='small' justify="space-between">
                                    <Text className="w-2/3">Участники:</Text>
                                    <Avatar.Group>
                                        {meeting?.attendants.map((attendant) => (
                                            <Tooltip title={attendant.user_short.first_name} placement="top">
                                                <Avatar size='small' icon={<UserOutlined/>} src={attendant.user_short.avatar}/>
                                            </Tooltip>
                                        ))}
                                    </Avatar.Group>
                                </Flex>
                            </Flex>
                        </Card>
                    </Col>
                </Row>
                <Card>
                    <Descriptions title="Информация о дате и времени" layout="vertical" items={timeItems}/>
                </Card>
                <Flex justify="space-between">
                    <Card>
                        <Descriptions title="Рекомендации" layout="vertical" items={recomendationItems}/>
                    </Card>
                </Flex>
            </Flex>
        </Col>
    </Row>
    </>)
}

export default MeetingPage;