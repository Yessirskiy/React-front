import React, { useState, useEffect, useContext } from "react";
import { Drawer, Flex, Checkbox, Typography, DatePicker, TreeSelect, Select, Slider} from "antd";
import { getCityById } from "../../api/location";
import { langLevels } from "../profile/forms/UserAdditionalForm";
import NotificationContext from "../../context/NotificationContext";
import dayjs from "dayjs";
import useAxios from "../../utils/UseAxios";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const accessability_select_options = [
    {
        value: "все",
        label: "Все",
    },
    {
        value: "мне",
        label: "Доступные",
    }
]

const duration_slider_marks = {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
}

const FilterDrawer = ({filterOpen, setFilterOpen, filters, setFilters, setCities}) => {
    const api = useAxios();
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

    const handleCalendarChange = async (dates) => {
        setFilters(prevFilter => ({
            ...prevFilter,
            startDate: dates[0] ? dayjs(dates[0]) : null,
            endDate: dates[1] ? dayjs(dates[1]) : null,
        }));
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
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCities(192);
    }, [])

    const changeAccess = (value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            accessability: value,
        }));
    }

    const changeAge = (value) => {
        setFilters(prevFilter => ({
            ...prevFilter,
            age: value,
        }));
    }

    const changeDuration = (values) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            duration_start: values[0],
            duration_end: values[1],
        }));
    }

    const changeEnglishLevels = (values) => {
        setFilters(prevFilter => ({
            ...prevFilter,
            englishLevels: values,
        }));
    }

    const changeOnlineFormat = (value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            is_online: value.target.checked,
        }));
    }

    const changeOfflineFormat = (value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            is_offline: value.target.checked,
        }));
    }

    const changeTree = (value) => {
        setFilters(prevFilter => ({
            ...prevFilter,
            location: value,
        }));
    }

    return <Drawer title="Фильтр потоков" onClose={() => (setFilterOpen(false))} open={filterOpen}>
        <Flex vertical={true} gap="large">
            <Flex vertical>
                <Title level={5}>Доступность</Title>
                <Flex vertical gap="middle">
                    <Select 
                        className="h-10 w-full"
                        variant="filled" 
                        placeholder="Доступность" 
                        allowClear
                        options={accessability_select_options} 
                        onClear={() => setAccessability(null)}
                        onSelect={(option) => (changeAccess(option))}
                        value={filters?.accessability}
                    />
                    <RangePicker 
                        rootClassName="h-10"
                        value={[filters?.startDate, filters?.endDate]} 
                        variant="filled" 
                        onCalendarChange={handleCalendarChange}    
                    />
                </Flex>
            </Flex>
            <Flex vertical>
                <Title level={5}>Продолжительность (в неделях)</Title>
                <Slider 
                    min={1} max={5} onChange={changeDuration}
                    range marks={duration_slider_marks}
                    value={[filters?.duration_start, filters?.duration_end]}
                />
            </Flex>
            <Flex vertical>
                <Title level={5}>Критерии</Title>
                <Flex vertical gap="middle">
                    <Select
                        className="h-10"
                        allowClear
                        showSearch
                        min={0}
                        max={100}
                        options={[...Array(100).keys()].map((value, ind) => {
                            return {value: ind, label: `${ind}+`}
                        })}
                        value={filters?.age}
                        variant="filled"
                        placeholder="Возраст"
                        onChange={(value) => (changeAge(value))}
                    />
                    <Select 
                        className="h-10"
                        variant="filled" 
                        mode="multiple"
                        placeholder="Уровень английского"
                        allowClear
                        options={langLevels} 
                        onClear={() => changeEnglishLevels([])}
                        onChange={(values) => (changeEnglishLevels(values))}
                        value={filters?.englishLevels}
                    />
                </Flex>
            </Flex>
            <Flex vertical>
                <Title level={5}>Локация</Title>
                <Flex vertical gap="middle">
                    <Flex gap="small">
                    <Checkbox 
                        checked={filters?.is_offline ? true : false} 
                        onChange={changeOfflineFormat}>Оффлайн</Checkbox>
                    <Checkbox 
                        checked={filters?.is_online ? true : false} 
                        onChange={changeOnlineFormat}>Онлайн</Checkbox>
                    </Flex>
                    {filters?.is_offline && <TreeSelect
                        className="h-10 w-full"
                        treeData={treeData}
                        value={filters?.location}
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
                        onChange={changeTree}
                    />}
                </Flex>
            </Flex>
        </Flex>
    </Drawer>
}

export default FilterDrawer;