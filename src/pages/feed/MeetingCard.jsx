import React from "react";
import { Card, Typography, Flex, Divider, Tag, Progress, Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import dayjs from "dayjs";

const { Title, Text } = Typography;

const conicColors = {
    '0%': '#87d068',
    '50%': '#ffe58f',
    '100%': '#ffccc7',
  };

const MeetingCard = ({data, loading}) => {
    const { id, title, topic, meeting_date, attendants, max_attendants } = data;
    const { is_online, min_english_level, min_age } = data;

    const handleClick = async (e) => {
        console.log(id);
    }

    return (
        <Card onClick={handleClick} hoverable loading={loading ? true : undefined}>
            <Flex justify="space-between">
                <div className='mb-2'>
                    <h3 className="m-0">{title}</h3>
                    <Text className="text-sm text-gray-300">Состоится {dayjs(meeting_date).format("YYYY-MM-DD HH:mm")}</Text>
                </div>
                <Flex wrap gap="4px 0" className='h-fit'>
                    <Tag bordered={false}>{min_english_level}</Tag>
                    <Tag bordered={false}>{is_online ? 'Онлайн' : 'Оффлайн'}</Tag>
                    <Tag bordered={false}>{min_age}+</Tag>
                </Flex>
            </Flex>
            <Divider style={{margin: 0}}/>
            <Flex className="my-2" wrap gap='large' justify="space-between">
                <Text className="w-2/3">{topic}</Text>
                <Avatar.Group>
                    <Avatar size='small' icon={<UserOutlined/>}/>
                    <Avatar size='small' icon={<UserOutlined/>}/>
                    <Avatar size='small' icon={<UserOutlined/>}/>
                </Avatar.Group>
            </Flex>
            <Progress size='small' percent={attendants.length / max_attendants * 100} showInfo={false}/>
            <Flex justify="space-between">
                <Text className="text-sm text-gray-300">Участников: {attendants.length}/{max_attendants}</Text>
                <Tag color="success" bordered={false} className="m-0">Открыто</Tag>
            </Flex>
        </Card>
    )
}

export default MeetingCard