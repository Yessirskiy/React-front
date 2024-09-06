import React from "react";
import { Card, Flex, Divider, Tag, Progress, Typography, Tooltip } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import { durationFormat } from "../../utils/DateFormatter";
dayjs.extend(duration);

const { Text } = Typography;

const EngLevelToColor = (engLevel) => {
    if (engLevel === "A1")
        return "geekblue";
    else if (engLevel === "A2")
        return "blue";
    else if (engLevel === "B1")
        return "cyan";
    else if (engLevel === "B2")
        return "green";
    else if (engLevel === "C1")
        return "lime";
    else if (engLevel === "C2")
        return "gold";
    else
        return "orange";
}

const CourseCard = ({data}) => {
    const { id, title, description, thumbnail, status, start_time, end_time } = data;
    const { min_age, is_online, country, city, english_level} = data;
    const course_duration = dayjs.duration(dayjs(end_time).diff(dayjs(start_time)));

    const getStatusTag = () => {
        const isBordered = false;
        if (status === "Открыт")
            return <Tag color="success" bordered={isBordered} className="m-0">Открыто</Tag>
        else if (status === "Запуск") 
            return <Tag color="warning" bordered={isBordered} className="m-0">Запускается</Tag>
        else if (status === "Идёт")
            return <Tag color="processing" bordered={isBordered} className="m-0">Идёт</Tag>
        else if (status === "Закрыт")
            return <Tag color="error" bordered={isBordered} className="m-0">Закрыт</Tag>
        else
            return null;
    }

    return (
        <Link state={{name: title}} to={`/courses/${id}`}>
            <Card hoverable cover={<img src={thumbnail}/>}>
                <Flex justify="space-between">
                    <Flex vertical className='mb-2'>
                        <h3 className="m-0">{title}</h3>
                        <Text className="text-sm text-gray-300">
                            {dayjs(start_time).format("D MMM YYYY")} - {dayjs(end_time).format("D MMM YYYY")}
                        </Text>
                        <Text className="text-sm text-gray-300">
                            ({course_duration.format(durationFormat(course_duration))})
                        </Text>
                    </Flex>
                    <Flex wrap gap="4px 0" className='h-fit justify-end'>
                        <Tooltip title={is_online ? "Формат" : "Локация"}>
                            {is_online ? <Tag bordered={false}>Онлайн</Tag> : <Tag color="orange" bordered={false}>{city}, {country}</Tag>}
                        </Tooltip>
                        <Tooltip title="Уровень языка">
                            <Tag bordered={false} color={EngLevelToColor(english_level)}>{english_level}</Tag>
                        </Tooltip>
                        <Tooltip title="Минимальный возраст">
                            <Tag color="volcano" bordered={false}>{min_age}+</Tag>
                        </Tooltip>
                        
                    </Flex>
                </Flex>
                <Divider style={{margin: 0}}/>
                <Flex className="my-2" wrap gap='large' justify="space-between">
                    <Text className="w-2/3">{description}</Text>
                    {/* <Avatar.Group>
                        {attendants.map((attendant) => (
                            <Tooltip title={attendant.user_short.first_name} placement="top">
                                <Avatar size='small' icon={<UserOutlined/>} src={attendant.user_short.avatar}/>
                            </Tooltip>
                        ))}
                    </Avatar.Group> */}
                </Flex>
                <Progress size='small' percent={50} showInfo={false}/>
                <Flex justify="space-between">
                    <Text className="text-sm text-gray-300">Участников: {3}/{5}</Text>
                    {getStatusTag()}
                </Flex>
            </Card>
        </Link>
    )
}

export default CourseCard;