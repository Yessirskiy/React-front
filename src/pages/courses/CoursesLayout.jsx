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
    duration_start: 1,
    duration_end: 4,
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
    const [cities, setCities] = useState({});

    const { setNotification } = useContext(NotificationContext);

    const getFeed = async (pagination) => {
        setCoursesLoading(true);
        try {
            let params = {};
            if (filters?.startDate)
                params.period_start = filters.startDate.toISOString();
            if (filters?.endDate)
                params.period_end = filters.endDate.toISOString();
            if (filters?.englishLevels)
                params.english_level = filters.englishLevels.join(",");
            if (filters?.age)
                params.min_age = filters.age;
            if (filters?.is_offline && filters?.location)
                params.location = cities[filters.location];
            if (filters?.duration_start)
                params.duration_start = filters.duration_start;
            if (filters?.duration_end)
                params.duration_end = filters.duration_end;
            if (filters?.is_offline && !filters?.is_online)
                params.is_online = false;
            else if (!filters?.is_offline && filters?.is_online)
                params.is_online = true;
            const data = await getCoursesFeed(
                api, pagination.current, pagination.pageSize, params
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
        if (filters)
            getFeed(coursesPagination);
    }, [filters]);

    const skeletonItems = Array.from({ length: 5 }).map((_, index) => (
        {key: index}
    ));
    return (
        <>
            <Flex wrap gap='small' className="w-full mb-6">
                <Button className="h-10" icon={<ControlOutlined/>} onClick={() => (setFilterOpen(true))} >Фильтры</Button>
                <Button className="h-10" type="link" onClick={() => (setFilters(default_filters))}>Сбросить</Button>
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
                    setCities={setCities}
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