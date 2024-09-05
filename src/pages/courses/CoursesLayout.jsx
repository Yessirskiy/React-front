import React, { useContext, useEffect, useState } from "react";
import { List, Card, Select, Flex, Skeleton, Divider, Button } from "antd";
import { ControlOutlined } from '@ant-design/icons';
import CourseCard from "./CourseCard";
import NotificationContext from "../../context/NotificationContext";
import useAxios from "../../utils/UseAxios";
import { getCoursesFeed } from "../../api/courses";
import dayjs from "dayjs";
import FilterDrawer from "./FilterDrawer";

const sorting_options = [
    {
        value: "relevant",
        label: "По релевантности"
    }, 
    {
        value: "soonest",
        label: "По дате начала"
    }
]

const default_filters = {
    accessability: null,
    englishLevels: ["B1"],
    location: null,
    startDate: dayjs(),
    endDate: null,
    is_online: false,
    is_offline: true,
    age: 16
}

const CoursesLayout = () => {
    const api = useAxios();
    const [coursesPagination, setCoursesPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [courses, setCourses] = useState([]);
    const [coursesLoading, setCoursesLoading] = useState(false);

    const [filterOpen, setFilterOpen] = useState(false);
    const [filters, setFilters] = useState(default_filters);

    const { setNotification } = useContext(NotificationContext);

    const getFeed = async (pagination) => {
        setCoursesLoading(true);
        try {
            const data = await getCoursesFeed(
                api, pagination.current, pagination.pageSize, 
                startDate ? startDate.toISOString() : null, 
                endDate ? endDate.toISOString() : null,
                englishLevel, age, cities[location]
            );
            setCourses(data.results);
            setCoursesPagination({
                ...pagination,
                total: data.count,
            })
            setCoursesLoading(false);
        } catch (error) {
            console.log(error);
            setNotification({
                type: "error",
                content: "Не удалось получить потоки."
            });
        }
    };

    useEffect(() => {
        console.log(filters);
    }, [filters]);

    const skeletonItems = Array.from({ length: 5 }).map((_, index) => (
        {key: index}
    ));
    return (
        <>
            <Flex wrap gap='small' className="w-full mb-6">
                <Button className="h-10" icon={<ControlOutlined/>} onClick={() => (setFilterOpen(true))} >Фильтры</Button>
                <Button className="h-10" type="link">Сбросить</Button>
                <Select 
                    className="h-10 ml-auto" 
                    placeholder="Сортировать по"
                    options={sorting_options}
                />
                <FilterDrawer 
                    filterOpen={filterOpen} 
                    setFilterOpen={setFilterOpen}
                    filters={filters}
                    setFilters={setFilters}
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
                    xxl: 4,
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