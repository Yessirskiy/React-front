import React from 'react';
import { Flex, Row, Col, Statistic, Typography, Divider, Card, Calendar, Badge } from 'antd';
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
                    lg={12} xl={8}
                >
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
                </Col>
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
            </Row>
        </NotificationProvider>
    );
};

export default FeedPage;