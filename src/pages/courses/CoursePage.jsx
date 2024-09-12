import React, { useContext, useState, useEffect } from "react";
import useAxios from "../../utils/UseAxios";
import { getMeeting, getMeetingEvents } from "../../api/meetings";
import { useParams } from "react-router-dom";
import NotificationContext from "../../context/NotificationContext";
import { StarOutlined, TeamOutlined, ReadOutlined, ProfileOutlined } from '@ant-design/icons';
import { Row, Col, Card, Typography, Statistic, Image, Flex, Space, Button } from "antd";
import { Skeleton, Divider } from "antd";
import duration from 'dayjs/plugin/duration';
import { formatPrice } from "../../utils/priceFormatting";
import 'dayjs/locale/ru'
import dayjs from "dayjs";
import { getCourse } from "../../api/courses";

dayjs.locale('ru');
dayjs.extend(duration);

const { Title, Text } = Typography;

const CoursePage = () => {
    const api = useAxios();
    const params = useParams();
    const [course, setCourse] = useState(null);
    const [courseLoading, setCourseLoading] = useState(true);
    const { setNotification } = useContext(NotificationContext);

    const retrieveCourse = async () => {
        setCourseLoading(true);
        try {
            const course = await getCourse(api, params.courseId);
            setCourse(course);
            setCourseLoading(false);
        } catch (error) {
            setNotification({
                type: "error",
                content: "Не удалось получить информацию о потоке."
            });
        }
    };

    useEffect(() => {
        retrieveCourse();
    }, []);

    return (
    <Row gutter={[28, 28]} justify="center">
        <Col
            className='gutter-row'
            xs={24} sm={24} md={22}
            lg={20} xl={18}
        >
            <Row gutter={[28, 28]}>
                <Col
                    className='gutter-row'
                    xs={12} sm={16} md={16}
                    lg={16} xl={16}
                >
                    <Title level={2}>{course?.title}</Title>
                    <Text className="text-xl">{course?.description}</Text>
                </Col>
                <Col
                    className='gutter-row'
                    xs={12} sm={8} md={8}
                    lg={8} xl={8}
                >
                    <Flex vertical gap="large">
                        <Image className="rounded-xl" src={course?.thumbnail}/>
                        <Card>
                            <Flex vertical gap="small">
                                { course?.price_discount 
                                    ? <Flex wrap gap="middle">
                                        <Statistic 
                                            title="Цена"
                                            value={parseFloat(course?.price_discount)}
                                            suffix="руб."
                                        />
                                        <Text className="self-end text-xl mb-1 text-gray-500" delete>{formatPrice(course?.price_original)} руб.</Text>
                                    </Flex>
                                    : <Statistic 
                                        title="Цена"
                                        value={parseFloat(course?.price_original)}
                                        suffix="руб."
                                    />
                                }
                                <Space.Compact block>
                                    <Button className="w-full" size="large" type="primary">Записаться</Button>
                                    <Button size="large" type="default" icon={<StarOutlined />}></Button>
                                </Space.Compact>
                                <Flex vertical className="mt-3">
                                    <Title level={5}>В данном потоке:</Title>
                                    <Flex className="ml-4" gap="small">
                                        <TeamOutlined />
                                        <Text>Еженедельные двух-часовые встречи</Text>
                                    </Flex> 
                                    <Flex className="ml-4 mt-1" gap="small">
                                        <ReadOutlined />
                                        <Text>Обширный список литературы</Text>
                                    </Flex> 
                                    <Flex className="ml-4 mt-1" gap="small">
                                        <ProfileOutlined />
                                        <Text>Более 20 заданий для отработки</Text>
                                    </Flex> 
                                </Flex>
                                <Divider className="my-3"/>
                                <Title level={5}>Хотите записаться на поток вместе с другом?</Title>
                                <Text></Text>
                            </Flex>
                        </Card>
                    </Flex>
                </Col>
            </Row>
        </Col>
    </Row>
    )
}

export default CoursePage;