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

    return <Title level={2}>{params.courseId}</Title>   
}

export default CoursePage;