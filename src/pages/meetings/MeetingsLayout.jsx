import React, { useContext, useEffect, useState } from "react";
import { List, Card, Select, Flex, Skeleton, Divider, DatePicker } from "antd";
import { langLevels } from "../profile/forms/UserAdditionalForm";
import { getMeetingsFeed } from "../../api/meetings";
import NotificationContext from "../../context/NotificationContext";
import useAxios from "../../utils/UseAxios";
import dayjs from "dayjs";
import MeetingCard from "../feed/MeetingCard";

const accessability_select_options = [
    {
        value: "все",
        label: "Все",
    },
    {
        value: "мне",
        label: "Доступные"
    }
]

const { RangePicker } = DatePicker;

const MeetingsLayout = () => {
    const api = useAxios();
    const [meetingsPagination, setMeetingsPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [meetings, setMeetings] = useState([]);
    const [meetingsLoading, setMeetingsLoading] = useState(false);
    const [accessability, setAccessability] = useState(null);
    const [englishLevel, setEnglishLevel] = useState(null);
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(null);
    const { setNotification } = useContext(NotificationContext);

    const getFeed = async (pagination) => {
        setMeetingsLoading(true);
        try {
            const data = await getMeetingsFeed(
                api, pagination.current, pagination.pageSize, 
                startDate ? startDate.toISOString() : null, 
                endDate ? endDate.toISOString() : null,
                englishLevel
            );
            setMeetings(data.results);
            setMeetingsPagination({
                ...pagination,
                total: data.count,
            })
            setMeetingsLoading(false);
        } catch (error) {
            setNotification({
                type: "error",
                content: "Не удалось получить ленту встреч."
            });
        }
    };

    useEffect(() => {
        getFeed(meetingsPagination);
    }, [englishLevel, accessability, startDate, endDate]);

    const handleCalendarChange = async (dates) => {
        setStartDate(dates[0] ? dayjs(dates[0]) : null);
        setEndDate(dates[1] ? dayjs(dates[1]) : null);
    };

    const skeletonItems = Array.from({ length: 5 }).map((_, index) => (
        {key: index}
    ));
    return (
        <>
            <Flex wrap gap='large' className="w-full mb-4">
                <Select 
                    disabled={meetingsLoading ? true : undefined} 
                    variant="filled" 
                    placeholder="Доступность" 
                    allowClear
                    options={accessability_select_options} 
                    onClear={() => setAccessability(null)}
                    onSelect={(option) => (setAccessability(option))}
                    value={accessability}
                />
                <Select 
                    disabled={meetingsLoading ? true : undefined} 
                    variant="filled" 
                    placeholder="Уровень английского"
                    allowClear
                    options={langLevels} 
                    onClear={() => setEnglishLevel(null)}
                    onSelect={(option) => (setEnglishLevel(option))}
                    value={englishLevel}
                />
                <RangePicker 
                    value={[startDate, endDate]} 
                    variant="filled" 
                    onCalendarChange={handleCalendarChange}    
                />
            </Flex>
            <List
                className="mb-7"
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 1,
                    md: 2,
                    lg: 2,
                    xl: 3,
                    xxl: 3,
                }}
                pagination={meetings.length > 0 ? meetingsPagination : false}
                dataSource={meetingsLoading && meetings.length === 0 ? skeletonItems : meetings}
                loading={false}
                renderItem={(item) => (
                    !meetingsLoading ? (
                        <List.Item>
                            <MeetingCard data={item}/>
                        </List.Item>
                    ) : (
                        <List.Item key={item.key}>
                            <Card hoverable>
                                <Skeleton className="mb-0" active title paragraph={{ rows: 0 }} />
                                <Divider className="my-0 mb-5"/>
                                <Skeleton active title={false} paragraph={{ rows: 4 }} />
                            </Card>
                        </List.Item>
                    )
                )}
            />
        </>
    )
}

export default MeetingsLayout;