import React from 'react';
import { Flex, Row, Col, Statistic, Typography, Divider, Card, Calendar, Badge } from 'antd';
import {
    InstagramOutlined,
    TwitterOutlined,
    YoutubeOutlined
  } from '@ant-design/icons'
import { NotificationProvider } from '../../context/NotificationContext';
import NewsCarousel from './NewsCarousel';
import BalanceCard from '../balance/BalanceCard';
import MeetingStatusCard from './MeetingStatusCard';


const { Title } = Typography;

const FeedPage = () => {

    const dateCellRender = (date) => {
        const isMeetingDay = date.$D % 7 == 0;
    
        return isMeetingDay ? (
          <Badge status="success" />
        ) : null;
      };
    
    return (
        <NotificationProvider className='p-6'>
            <Row gutter={[28, 28]}>
            <Col
                    className='gutter-row'
                    xs={24} sm={24} md={24}
                    lg={12} xl={16}
                >
                    <Flex vertical>
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
                        
                    </Flex>
                    
                </Col>
                <Col
                    className='gutter-row'
                    xs={24} sm={24} md={24}
                    lg={12} xl={8}
                >
                    <Flex vertical gap={28}>
                        <Card>
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
                                <Card className='text-center'>
                                    <InstagramOutlined style={{fontSize: "30px"}}/>
                                    Instagram
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