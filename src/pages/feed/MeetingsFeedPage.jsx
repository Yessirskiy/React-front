import React, { useContext, useEffect, useState } from 'react';
import { Flex, Row, Col, Statistic, Typography, Divider, Card, Calendar, Badge, Skeleton } from 'antd';
import {
    InstagramOutlined,
    TwitterOutlined,
    YoutubeOutlined
  } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import NotificationContext, { NotificationProvider } from '../../context/NotificationContext';
import NewsCarousel from './NewsCarousel';
import BalanceCard from '../balance/BalanceCard';
import MeetingCard from './MeetingCard';
import MeetingStatusCard from './MeetingStatusCard';
import { getMeetingsFeed, getMeetingsCalendar, getMeetingsOverview } from '../../api/meetings';
import useAxios from '../../utils/UseAxios';
import dayjs from 'dayjs';


const { Title } = Typography;

const MeetingsFeedPage = () => {
    const api = useAxios();
    const [meetingCards, setMeetingCards] = useState([]);
    const [meetingsLoading, setMeetingsLoading] = useState(true);
    const [range, setRange] = useState({ start: null, end: null });
    const [meetingsCalendar, setMeetingsCalendar] = useState([]);
    const [meetingsOverview, setMeetingsOverview] = useState({
        attended_count: null, 
        upcoming_count: null, 
        prev_meeting: null,
        is_prev_reviewed: null,
        next_meeting: null
    });
    const [meetingsOverviewLoading, setMeetingsOverviewLoading] = useState(true);
    const { setNotification } = useContext(NotificationContext);
 
    const dateCellRender = (date) => {
        const meetingDates = meetingsCalendar.map(meeting => ({
            id: meeting.id,
            date: dayjs(meeting.meeting_start_date).format('YYYY-MM-DD')
        }));

        const meeting = meetingDates.find(meeting => meeting.date === date.format('YYYY-MM-DD'));
        return meeting ? (
            <Link to={`/meetings/${meeting.id}`}>
                <Badge status={dayjs(meeting.date) > dayjs() ? "processing" : "success"} />
            </Link>
        ) : null;

    };

    const getFeed = async () => {
        setMeetingsLoading(true);
        try {
            const data = await getMeetingsFeed(api, 1, 10, dayjs().toISOString());
            setMeetingCards(data.results);
            setMeetingsLoading(false);
        } catch (error) {
            setNotification({
                type: "error",
                content: "Не удалось получить ленту встреч."
            });
        } finally {
            
        }
    };

    const getUserCalendar = async () => {
        try {
            const data = await getMeetingsCalendar(api, dayjs(range.start).format(), dayjs(range.end).format());
            setMeetingsCalendar(data);
        } catch (error) {
            setNotification({
                type: "error",
                content: "Не удалось получить календарь ваших встреч."
            });
        }
    }

    const getUserOverview = async () => {
        setMeetingsOverviewLoading(true);
        try {
            const data = await getMeetingsOverview(api);
            setMeetingsOverview(data);
            setMeetingsOverviewLoading(false);
        } catch (error) {
            setNotification({
                type: "error",
                content: "Не удалось получить обзор встреч."
            });
        }
    }

    const calculateDisplayedRange = (date) => {
        const startOfMonth = dayjs(date).startOf('month');
        const endOfMonth = dayjs(date).endOf('month');
        const startOfCalendar = startOfMonth.startOf('week');
        const endOfCalendar = endOfMonth.endOf('week').add(8, 'day');
    
        setRange({
          start: startOfCalendar.format('YYYY-MM-DD'),
          end: endOfCalendar.format('YYYY-MM-DD'),
        });
    };

    useEffect(() => {
        getFeed();
        getUserOverview();
        calculateDisplayedRange(dayjs());
    }, []);

    useEffect(() => {
        if (range.start && range.end)
            getUserCalendar();
    }, [range]);

    const onPanelChange = (date, mode) => {
        calculateDisplayedRange(date);
    };

    const fakeMeetings = Array.from({ length: 3 }).map((_, index) => (
        <Col xs={24} sm={24} md={24} lg={24} xl={12} key={index}>
            <Card hoverable key={index}>
                <Skeleton className="mb-0" active title paragraph={{ rows: 0 }} />
                <Divider className="my-0 mb-5"/>
                <Skeleton active title={false} paragraph={{ rows: 4 }} />
            </Card>
        </Col>
    ));
    
    return (
        <div>
            <Row gutter={[28, 28]}>
            <Col
                    className='gutter-row'
                    xs={24} sm={24} md={24}
                    lg={12} xl={16}
                >
                    <Flex vertical gap={28}>
                        <NewsCarousel/>
                        <Row gutter={[28, 28]}>
                            <Col
                                xs={24} sm={24} md={12}
                                lg={12} xl={12}
                            >
                                <MeetingStatusCard 
                                    overview={meetingsOverview}
                                    overviewLoading={meetingsOverviewLoading}
                                    getUserOverview={getUserOverview}
                                />
                            </Col>
                            <Col
                                xs={24} sm={24} md={12}
                                lg={12} xl={12}
                            >
                                <BalanceCard/>
                            </Col>
                            
                        </Row>
                        <Card bordered={false}>
                            <Row gutter={[28, 28]}>
                            {meetingsLoading ? 
                            fakeMeetings :
                            meetingCards.map((card) => (
                                <Col xs={24} sm={24} md={24} lg={24} xl={12} key={card.id}>
                                    <MeetingCard
                                        key={card.id}
                                        loading={meetingsLoading}
                                        data={card}
                                    />
                                </Col>
                            ))
                            }
                            </Row>
                        </Card>
                    </Flex>
                    
                </Col>
                <Col
                    className='gutter-row'
                    xs={24} sm={24} md={24}
                    lg={12} xl={8}
                >
                    <Flex vertical gap={28}>
                        <Card bordered={false}>
                            <Title level={4}>Главное</Title>
                            <Card className='mb-6'>
                                <Flex wrap justify='space-between'>
                                    <Statistic
                                        loading={meetingsOverviewLoading}
                                        title="Предстоящих встреч"
                                        value={meetingsOverview.upcoming_count}
                                    />
                                    <Statistic
                                        loading={meetingsOverviewLoading}
                                        title="Посещенных встреч"
                                        value={meetingsOverview.attended_count}
                                    />
                                </Flex>
                            </Card>
                            <Calendar onPanelChange={onPanelChange} cellRender={dateCellRender} fullscreen={false} />
                        </Card>
                        <Card>
                            <Title level={4}>Наши соцсети:</Title>
                            
                            <Flex wrap gap='large' justify='space-around'>
                                <Card hoverable bordered={false}>
                                    <Flex vertical className='items-center'>
                                        <InstagramOutlined style={{fontSize: "30px"}}/>
                                        Instagram
                                    </Flex>
                                </Card>
                                <Card hoverable bordered={false}>
                                    <Flex vertical className='items-center'>
                                        <YoutubeOutlined style={{fontSize: "30px"}}/>
                                        Youtube
                                    </Flex>
                                </Card>
                                <Card hoverable bordered={false}>
                                    <Flex vertical className='items-center'>
                                        <TwitterOutlined style={{fontSize: "30px"}}/>
                                        Twitter
                                    </Flex>
                                </Card>
                            </Flex>
                        </Card>
                    </Flex>
                </Col>
            </Row>
        </div>
    );
};

export default MeetingsFeedPage;