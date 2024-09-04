import React, { useContext, useEffect, useState } from "react";
import { List, Card, Select, Flex, Skeleton, Divider, DatePicker, TreeSelect, Segmented, Drawer, Button, Typography } from "antd";
import { DesktopOutlined, HomeOutlined, ControlOutlined, ControlFilled } from '@ant-design/icons';
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

const { Title } = Typography;
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

    const [filtersOpen, setFiltersOpen] = useState(false);
    const [accessability, setAccessability] = useState(null);
    const [englishLevel, setEnglishLevel] = useState(null);
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(null);
    const [age, setAge] = useState(16);
    const [cities, setCities] = useState({});
    const [location, setLocation] = useState(null);

    const [treeData, setTreeData] = useState([
        {
            id: 192,
            pId: 0,
            value: "Russia",
            title: "Russia",
            isLeaf: false,
            selectable: false,
        }
    ]);
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

    const fetchCities = async (country_id) => {
        try {
            const data = await getCityById(api, country_id);
            const processed = data.map(city => {
                return {
                    id: city.id,
                    pId: country_id,
                    value: city.name,
                    title: city.name,
                    isLeaf: true,
                };
            });
            const citiesMap = data.reduce((acc, city) => {
                acc[city.name] = city.id; 
                return acc;
            }, {});
    
            setCities(prevCities => ({
                ...prevCities,
                ...citiesMap
            }));
            setTreeData(prevTreeData =>
                prevTreeData.map(item =>
                    item.id === country_id ? { ...item, children: processed } : item
                )
            );
        } catch (error) {
            setNotification({
                type: 'error',
                content: 'Не удалось получить список городов.',
            });
        }
    };

    useEffect(() => {
        fetchCities(192);
    }, [])

    useEffect(() => {
        getFeed(coursesPagination);
    }, [location, englishLevel, age, accessability, startDate, endDate]);

    const handleCalendarChange = async (dates) => {
        setStartDate(dates[0] ? dayjs(dates[0]) : null);
        setEndDate(dates[1] ? dayjs(dates[1]) : null);
    };

    const handleTreeChange = async (value, label, extra) => {
        setLocation(value);
    }

    const skeletonItems = Array.from({ length: 5 }).map((_, index) => (
        {key: index}
    ));
    return (
        <>
            <Flex wrap gap='small' className="w-full mb-6">
                <Button className="h-10" icon={<ControlOutlined/>} onClick={() => (setFiltersOpen(true))} >Фильтры</Button>
                <Button className="h-10" type="link">Сбросить</Button>
                <Select 
                    className="h-10 ml-auto" 
                    placeholder="Сортировать по"
                    options={sorting_options}
                />
                <Drawer title="Фильтр потоков" onClose={() => (setFiltersOpen(false))} open={filtersOpen}>
                    <Flex vertical={true} gap="large">
                        <Flex vertical gap="middle">
                            <Title className="mb-0" level={5}>Основные</Title>
                            <Select 
                                className="h-10 w-full"
                                disabled={coursesLoading ? true : undefined} 
                                variant="filled" 
                                placeholder="Доступность" 
                                allowClear
                                options={accessability_select_options} 
                                onClear={() => setAccessability(null)}
                                onSelect={(option) => (setAccessability(option))}
                                value={accessability}
                            />
                        </Flex>
                        <Select
                            className="h-10"
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
                            className="h-10"
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
                            className="h-10 w-full"
                            treeData={treeData}
                            value={location}
                            placeholder="Локация"
                            variant="filled"
                            dropdownStyle={{
                                maxHeight: 400,
                                overflow: 'auto',
                            }}
                            treeNodeFilterProp='title'
                            showSearch
                            treeDataSimpleMode
                            allowClear
                            onChange={handleTreeChange}

                        />
                        <Segmented 
                            className="w-min"
                            options={[
                                { label: 'Оффлайн', value: true, icon: <HomeOutlined /> },
                                { label: 'Онлайн', value: false, icon: <DesktopOutlined /> },
                            ]}
                        />
                        <RangePicker 
                            rootClassName="h-10"
                            disabled={coursesLoading ? true : undefined}
                            value={[startDate, endDate]} 
                            variant="filled" 
                            onCalendarChange={handleCalendarChange}    
                        />
                    </Flex>
                </Drawer>
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