import React, { useContext, useEffect, useState } from "react";
import { List, Card, Select, Flex, Skeleton, Divider, DatePicker, TreeSelect } from "antd";
import CourseCard from "./CourseCard";
import { langLevels } from "../profile/forms/UserAdditionalForm";
import NotificationContext from "../../context/NotificationContext";
import useAxios from "../../utils/UseAxios";
import { getCoursesFeed } from "../../api/courses";
import { getCountries, getCityById } from "../../api/location";
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
    const [age, setAge] = useState(7);
    
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [treeData, setTreeData] = useState([]);
    const [treeValue, setTreeValue] = useState();
    const { setNotification } = useContext(NotificationContext);

    const getFeed = async (pagination) => {
        setCoursesLoading(true);
        try {
            const data = await getCoursesFeed(
                api, pagination.current, pagination.pageSize, 
                startDate ? startDate.toISOString() : null, 
                endDate ? endDate.toISOString() : null,
                englishLevel, age
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

    const fetchCountries = async () => {
        try {
            const data = await getCountries(api);
            const processed = data.map(country => {
                return {
                    id: country.id,
                    pId: 0,
                    value: country.id,
                    title: country.name,
                    isLeaf: false,
                };
            });
            setTreeData(processed);
        } catch (error) {
            setNotification({
                type: 'error',
                content: 'Не удалось получить список стран.',
            });
            setCountries([]);
        }
    };

    const fetchCities = async (country_id) => {
        try {
            const data = await getCityById(api, country_id);
            const processed = data.map(city => {
                return {
                    id: city.id,
                    pId: country_id,
                    value: city.id,
                    title: city.name,
                    isLeaf: true,
                };
            });
            setTreeData(treeData.concat(processed));
        } catch (error) {
            setNotification({
                type: 'error',
                content: 'Не удалось получить список городов.',
            });
        }
    };

    useEffect(() => {
        fetchCountries();
    }, [])

    useEffect(() => {
        getFeed(coursesPagination);
    }, [englishLevel, age, accessability, startDate, endDate]);

    const handleCalendarChange = async (dates) => {
        setStartDate(dates[0] ? dayjs(dates[0]) : null);
        setEndDate(dates[1] ? dayjs(dates[1]) : null);
    };

    const handleTreeChange = async (value, label, extra) => {
        console.log(value, label, extra);
        setTreeValue(value);
    }

    const handleTreeLoad = ({id, pId, isLeaf}) => 
        new Promise((resolve) => {
            console.log(id);
            fetchCities(id);
            resolve(undefined);
    })


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
                    disabled={coursesLoading ? true: undefined}
                    allowClear
                    showSearch
                    min={0}
                    max={100}
                    options={[...Array(100).keys()].map((value, ind) => {
                        return {value: ind, label: `${ind}+`}
                    })}
                    value={age}
                    variant="filled"
                    placeholder="Возраст"
                    onChange={(value) => (setAge(value))}
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
                <TreeSelect
                    showSearch
                    treeDataSimpleMode
                    treeData={treeData}
                    placeholder="Локация"
                    variant="filled"
                    dropdownStyle={{
                        maxHeight: 400,
                        overflow: 'auto',
                    }}
                    className="w-fit"
                    onChange={handleTreeChange}
                    loadData={handleTreeLoad}

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