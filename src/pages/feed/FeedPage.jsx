import React, { useContext, useEffect, useState } from 'react';
import { Flex, Row, Col, Statistic, Typography, Divider, Card, Calendar, Badge } from 'antd';
import {
    InstagramOutlined,
    TwitterOutlined,
    YoutubeOutlined
  } from '@ant-design/icons'
import NotificationContext, { NotificationProvider } from '../../context/NotificationContext';
import NewsCarousel from './NewsCarousel';
import BalanceCard from '../balance/BalanceCard';
import MeetingCard from './MeetingCard';
import MeetingStatusCard from './MeetingStatusCard';
import { getMeetingsFeed } from '../../api/meetings';
import useAxios from '../../utils/UseAxios';


const { Title } = Typography;

const FeedPage = () => {
    const api = useAxios();
    const [meetingCards, setMeetingCards] = useState([]);
    const [meetingsLoading, setMeetingsLoading] = useState(true);
    // const { setNotification } = useContext(NotificationContext);
 
    const dateCellRender = (date) => {
        const isMeetingDay = date.$D % 7 == 0;
    
        return isMeetingDay ? (
          <Badge status="success" />
        ) : null;
    };

    const getFeed = async () => {
        setMeetingsLoading(true);
        try {
            const data = await getMeetingsFeed(api, 1, 10);
            setMeetingCards(data.results);
        } catch (error) {
            console.log("Couldn't load cards");
            // setNotification({
            //     type: "error",
            //     content: "Не удалось получить ленту встреч."
            // });
        } finally {
            setMeetingsLoading(false);
        }
    };

    useEffect(() => {
        getFeed();
    }, []);
    
    return (
        <NotificationProvider className='p-6'>
            <Row gutter={[28, 28]}>
            <Col
                    className='gutter-row'
                    xs={24} sm={24} md={24}
                    lg={12} xl={16}
                >
                    <Flex vertical gap={28}>
                        <NewsCarousel/>
                        <Row gutter={28}>
                            <Col
                                xs={24} sm={24} md={12}
                                lg={12} xl={12}
                            >
                                <MeetingStatusCard/>
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
                            {meetingCards.map((card) => (
                                <Col xs={24} sm={24} md={24} lg={24} xl={12} key={card.id}>
                                    <MeetingCard
                                        loading={meetingsLoading}
                                        data={card}
                                    />
                                </Col>
                                ))} 
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
                                        title="Предстоящих встреч"
                                        value={5}
                                    />
                                    <Statistic
                                        title="Посещенных встреч"
                                        value={10}
                                    />
                                </Flex>
                            </Card>
                            <Calendar cellRender={dateCellRender} fullscreen={false} />
                        </Card>
                        <Card>
                            <Title level={4}>Наши соцсети:</Title>
                            
                            <Flex gap='large'>
                                <Card bordered={false} className='text-center'>
                                    <Flex vertical className='align-middle'>
                                        <InstagramOutlined style={{fontSize: "30px"}}/>
                                        Instagram
                                    </Flex>
                                </Card>
                                
                                <TwitterOutlined style={{fontSize: "30px"}}/>
                                <YoutubeOutlined style={{fontSize: "30px"}}/>
                            </Flex>
                        </Card>
                    </Flex>
                </Col>
            </Row>
        </NotificationProvider>
    );
};

export default FeedPage;