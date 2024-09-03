import React, { useContext, useEffect, useState } from "react";
import { List, Card, Select, Flex, Skeleton, Divider, DatePicker } from "antd";
import { langLevels } from "../profile/forms/UserAdditionalForm";
import { getCoursesFeed } from "../../api/courses";
import NotificationContext from "../../context/NotificationContext";
import useAxios from "../../utils/UseAxios";
import dayjs from "dayjs";

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

const CoursesLayout = () => {
    const api = useAxios();
    const [coursesPagination, setCoursesPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [courses, setCourses] = useState([]);
    const [coursesLoading, setCoursesLoading] = useState(false);
    const [accessability, setAccessability] = useState(null);
    const [englishLevel, setEnglishLevel] = useState(null);
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(null);
    const { setNotification } = useContext(NotificationContext);

    const getFeed = async (pagination) => {
        setCoursesLoading(true);
        try {
            const data = await getCoursesFeed(
                api, pagination.current, pagination.pageSize, 
                startDate ? startDate.toISOString() : null, 
                endDate ? endDate.toISOString() : null,
                englishLevel
            );
            setCourses(data.results);
            setCoursesPagination({
                ...pagination,
                total: data.count,
            })
            setCoursesLoading(false);
        } catch (error) {
            setNotification({
                type: "error",
                content: "Не удалось получить потоки."
            });
        }
    };

    useEffect(() => {
        getFeed(coursesPagination);
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
                    disabled={coursesLoading ? true : undefined} 
                    variant="filled" 
                    placeholder="Доступность" 
                    allowClear
                    options={accessability_select_options} 
                    onClear={() => setAccessability(null)}
                    onSelect={(option) => (setAccessability(option))}
                    value={accessability}
                />
                <Select 
                    disabled={coursesLoading ? true : undefined} 
                    variant="filled" 
                    placeholder="Уровень английского"
                    allowClear
                    options={langLevels} 
                    onClear={() => setEnglishLevel(null)}
                    onSelect={(option) => (setEnglishLevel(option))}
                    value={englishLevel}
                />
                <RangePicker 
                    disabled={coursesLoading ? true : undefined}
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
                pagination={courses.length > 0 ? coursesPagination : false}
                dataSource={coursesLoading && courses.length === 0 ? skeletonItems : courses}
                loading={false}
                renderItem={(item) => (
                    !coursesLoading ? (
                        <List.Item>
                            <CourseCard data={item}/>
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

export default CoursesLayout;