import React from "react";
import { Card, Typography, Flex, Divider, Tag, Progress, Avatar, Tooltip } from "antd";
import { UserOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import wordForm from "../../utils/wordForming";
import { Link } from "react-router-dom";

dayjs.extend(duration);


const { Title, Text } = Typography;

function durationFormat(duration) {
    if (duration.minutes() === 0) {
        return `H ${wordForm(duration.hours(), "час", "часа", "часов")}`
    } else if (duration.hours() != 0) {
        return `H ${wordForm(duration.hours(), "час", "часа", "часов")} m ${wordForm(duration.minutes(), 'минута', 'минуты', 'минут')}`
    } else if (duration.hours() === 0) {
        return `m ${wordForm(duration.minutes(), 'минута', 'минуты', 'минут')}`
    }
}

const MeetingCard = ({data, loading}) => {
    const { id, title, topic, meeting_start_date, meeting_end_date, attendants, max_attendants } = data;
    const { is_online, english_level, min_age } = data;
    const meeting_duration = dayjs.duration(dayjs(meeting_end_date).diff(dayjs(meeting_start_date)));

    return (
        <Link state={{name: title}} to={`/meetings/${id}`}>
            <Card hoverable loading={loading ? true : undefined}>
                <Flex justify="space-between">
                    <Flex vertical className='mb-2'>
                        <h3 className="m-0">{title}</h3>
                        <Text className="text-sm text-gray-300">
                            {dayjs(meeting_start_date).isAfter(dayjs()) ? "Состоится " : "Состоялось "} 
                            {dayjs(meeting_start_date).format("YYYY-MM-DD HH:mm")}
                        </Text>
                        <Text className="text-sm text-gray-300">
                        ({meeting_duration.format(durationFormat(meeting_duration))})
                        </Text>
                    </Flex>
                    <Flex wrap gap="4px 0" className='h-fit justify-end'>
                        <Tag bordered={false}>{english_level}</Tag>
                        <Tag bordered={false}>{is_online ? 'Онлайн' : 'Оффлайн'}</Tag>
                        <Tag bordered={false}>{min_age}+</Tag>
                    </Flex>
                </Flex>
                <Divider style={{margin: 0}}/>
                <Flex className="my-2" wrap gap='large' justify="space-between">
                    <Text className="w-2/3">{topic}</Text>
                    <Avatar.Group>
                        {attendants.map((attendant) => (
                            <Tooltip title={attendant.user_short.first_name} placement="top">
                                <Avatar size='small' icon={<UserOutlined/>} src={attendant.user_short.avatar}/>
                            </Tooltip>
                        ))}
                    </Avatar.Group>
                </Flex>
                <Progress size='small' percent={attendants.length / max_attendants * 100} showInfo={false}/>
                <Flex justify="space-between">
                    <Text className="text-sm text-gray-300">Участников: {attendants.length}/{max_attendants}</Text>
                    <Tag color="success" bordered={false} className="m-0">Открыто</Tag>
                </Flex>
            </Card>
        </Link>
    )
}

export default MeetingCard