import React, { useContext, useState, useEffect } from "react";
import useAxios from "../../utils/UseAxios";
import { getMeeting, getMeetingEvents } from "../../api/meetings";
import { useParams } from "react-router-dom";
import NotificationContext from "../../context/NotificationContext";
import { UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Row, Col, Card, Flex, Space, Typography, Descriptions, Tooltip, Progress, Avatar, Badge, Button, Steps } from "antd";
import { Skeleton } from "antd";
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
    const [meetingEvents, setMeetingEvents] = useState([]);
    const [timeline, setTimeline] = useState([]);
    const [timelineCur, setTimelineCur] = useState(0);
    const [meetingDuration, setMeetingDuration] = useState(null);
    const [meetingLoading, setMeetingLoading] = useState(true);
    const [meetingEventsLoading, setMeetingEventsLoading] = useState(true);
    const { setNotification } = useContext(NotificationContext);

    const retrieveMeeting = async () => {
        setMeetingLoading(true);
        try {
            const data = await getMeeting(api, params.meetingId);
            setMeeting(data);
            setMeetingDuration(dayjs.duration(dayjs(data.meeting_end_date).diff(dayjs(data.meeting_start_date))));
            setMeetingLoading(false);
        } catch (error) {
            setNotification({
                type: "error",
                content: "Не удалось получить встречу."
            });
        }
    }

    const retrieveMeetingEvents = async () => {
        setMeetingEventsLoading(true);
        try {
            const data = await getMeetingEvents(api, params.meetingId);
            setMeetingEvents(data);
            setMeetingEventsLoading(false);
        } catch (error) {
            setNotification({
                type: "error",
                content: "Не удалось получить ленту событий."
            });
        }
    }

    useEffect(() => {
        retrieveMeeting();
        retrieveMeetingEvents();
    }, []);

    const getStatusBadge = (status) => {
        if (status === "Запланированно")
            return "processing";
        else if (status === "Отменено")
            return "error"
        else if (status === "Активно")
            return "warning"
    };

    const infoItems = [
        {
            key: "topic",
            span: 2,
            label: "Тема",
            children: <Skeleton paragraph={{rows: 1}} active loading={meetingLoading}>{meeting?.topic}</Skeleton>,
        },
        {
            key: "format",
            span: {
                xs: 2,
                sm: 2,
                md: 1,
                lg: 1,
                xl: 1,
                xxl: 1,
            },
            label: <Tooltip title="Подробнее далее">Формат</Tooltip>,
            children: <Skeleton title={false} paragraph={{rows: 1}} active loading={meetingLoading}>{meeting?.is_online ? "Онлайн" : "Оффлайн"}</Skeleton>
        },
        {
            key: "status",
            span: {
                xs: 2,
                sm: 2,
                md: 1,
                lg: 1,
                xl: 1,
                xxl: 1,
            },
            label: <Tooltip title="Статус">Статус</Tooltip>,
            children: <Skeleton title={false} paragraph={{rows: 1}} active loading={meetingLoading}><Badge status={getStatusBadge(meeting?.status)} text={meeting?.status} /></Skeleton>,
        }
    ];

    const timeItems = [
        {
            key: "meeting_start_date",
            span: {
                xs: 2,
                sm: 2,
                md: 2,
                lg: 2,
                xl: 1,
                xxl: 1,
            },
            label: "Время начала",
            children: <Skeleton title={false} paragraph={{rows: 1}} active loading={meetingLoading}>{dayjs(meeting?.meeting_start_date).format(dateFormat)}</Skeleton>
        },
        {
            key: "meeting_end_date",
            span: {
                xs: 2,
                sm: 2,
                md: 2,
                lg: 2,
                xl: 1,
                xxl: 1,
            },
            label: "Время окончания",
            children: <Skeleton title={false} paragraph={{rows: 1}} active loading={meetingLoading}>{dayjs(meeting?.meeting_end_date).format(dateFormat)}</Skeleton>
        },
        {
            key: "meeting_duration",
            span: {
                xs: 4,
                sm: 4,
                md: 4,
                lg: 4,
                xl: 1,
                xxl: 1,
            },
            label: "Продолжительность",
            children: <Skeleton title={false} paragraph={{rows: 1}} active loading={meetingLoading}>{meetingDuration?.format(durationFormat(meetingDuration))}</Skeleton>
        }
    ];

    const recomendationItems = [
        {
            key: "english_level",
            label: <Tooltip title="Рекомендованный уровень владения языком">Уровень английского</Tooltip>,
            children: <Skeleton title={false} paragraph={{rows: 1}} active loading={meetingLoading}>{meeting?.english_level}</Skeleton>,
        },
        {
            key: "age",
            label: <Tooltip title="Ограничения по возрасту">Возраст</Tooltip>,
            children: <Skeleton title={false} paragraph={{rows: 1}} active loading={meetingLoading}>{meeting?.min_age}+</Skeleton>,
        },
    ];

    const getTimeline = () => {
        setTimeline(meetingEvents.map((item, i) => {
            if (dayjs() > dayjs(item["date"])){
                if (i == meetingEvents.length - 1)
                    setTimelineCur(i + 1);
                else
                    setTimelineCur(i);
            }
            return {
                title: item["name"],
                description: dayjs(item["date"]).format(dateFormat)
            }
        }));
    };

    useEffect(() => {
        getTimeline();
    }, [meetingEvents]);

    return (
    <>
    <Row
        justify="center"
    >
        <Col
            xs={24} sm={22} md={22} 
            lg={20} xl={20} xxl={18}
        >
            <Title level={2} >{meeting?.title}</Title>
            <Flex vertical gap="large">
                <Row gutter={[24, 24]} gap="large">
                    <Col 
                        xs={24} sm={24} md={24} 
                        lg={16} xl={16}
                    >
                        <Card className="h-full">
                            <Descriptions 
                                column={2}
                                className="h-full" 
                                title="Общая информация" 
                                layout="vertical" 
                                items={infoItems}
                                bordered
                            />  
                        </Card>
                    </Col>
                    <Col
                        xs={24} sm={24} md={12} 
                        lg={8} xl={8}
                    >
                        <Card className="h-full">
                            <Flex vertical gap='middle' align="center">
                                <Skeleton loading={meetingLoading} active paragraph={{rows: 0}}>
                                    <Title level={5} className="text-left w-full">Участники</Title>
                                </Skeleton>
                                <Skeleton loading={meetingLoading} title={false} active paragraph={{rows: 4}}>
                                    <Progress 
                                        percent={meeting ? (meeting.attendants.length / meeting.max_attendants * 100) : 50} 
                                        type="dashboard" 
                                        format={meeting ? (() => `${meeting?.attendants.length}/${meeting?.max_attendants}`)
                                        : (() => "")
                                        }
                                    />
                                </Skeleton>
                                {meeting?.attendants && 
                                <Flex wrap gap='small' justify="space-between">
                                    <Text className="w-fit">Участники:</Text>
                                    <Avatar.Group>
                                        {meeting?.attendants.map((attendant) => (
                                            <Tooltip title={attendant.user_short.first_name} placement="top">
                                                <Avatar size='small' icon={<UserOutlined/>} src={attendant.user_short.avatar}/>
                                            </Tooltip>
                                        ))}
                                    </Avatar.Group>
                                </Flex>
                                }
                                {meetingLoading ? (
                                    <Skeleton.Button block={true} active={true}/>
                                ) : (
                                    <Button className="w-full" size="large">Присоединиться</Button>
                                )}
                                
                            </Flex>
                        </Card>
                    </Col>
                    <Col
                        xs={24} sm={24} md={12} 
                        lg={10} xl={8} xxl={8}
                    >
                        <Card className='h-full'>
                            {meeting ? <Flex vertical gap="large">
                                <Title level={5}>Лента событий</Title>
                                <Steps current={timelineCur} direction="vertical" items={timeline} />
                            </Flex> : <Skeleton loading={true} active title={false} paragraph={{rows: 10}}></Skeleton>}
                        </Card>
                    </Col>
                    <Col
                        xs={24} sm={24} md={24} 
                        lg={14} xl={16} xxl={16}
                    >
                        <Card className="h-full">
                            <Flex vertical gap="large">
                                <Descriptions 
                                    bordered 
                                    column={4}
                                    title="Информация о дате и времени"
                                    layout="vertical" 
                                    items={timeItems}
                                />
                                <Descriptions bordered title="Рекомендации" layout="vertical" items={recomendationItems}/>
                            </Flex>
                        </Card>
                    </Col>
                </Row>
            </Flex>
        </Col>
    </Row>
    </>)
}

export default MeetingPage;