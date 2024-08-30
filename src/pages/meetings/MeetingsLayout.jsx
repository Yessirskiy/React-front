import React, { useState } from "react";
import { List, Card, Select, Flex, Skeleton, Divider } from "antd";
import { langLevels } from "../profile/forms/UserAdditionalForm";

const data = [
    {
        title: 'Title 1',
    },
    {
        title: 'Title 2',
    },
    {
        title: 'Title 3',
    },
    {
        title: 'Title 4',
    },
    {
        title: 'Title 5',
    },
];

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

const MeetingsLayout = () => {
    const [meetingsPagination, setMeetingsPagination] = useState({
        current: 1,
        pageSize: 12,
        total: data.length,
    });
    const [meetings, setMeetings] = useState([]);
    const [meetingsLoading, setMeetingsLoading] = useState(false);


    const skeletonItems = Array.from({ length: 5 }).map((_, index) => (
        {key: index}
    ));
    return (
        <>
            <Flex wrap gap='large' className="w-full mb-4">
                <Select disabled={meetingsLoading ? true : undefined} variant="filled" placeholder="Доступность" options={accessability_select_options} />
                <Select disabled={meetingsLoading ? true : undefined} variant="filled" placeholder="Уровень английского" options={langLevels} />
            </Flex>
            <List
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
                            <Card hoverable title={item.title}>Card content</Card>
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