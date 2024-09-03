import React from "react";
import { Tabs, Input, Flex } from 'antd';
import CoursesLayout from "./CoursesLayout";


const { Search } = Input

const items = [
  {
    key: 'feed',
    label: 'Подборка',
    children: <CoursesLayout/>,
  },
  {
    key: 'finished',
    label: 'Прошедшие',
    children: <CoursesLayout/>,
  },
  {
    key: 'saved',
    label: 'Сохраненные',
    children: <CoursesLayout/>,
  },
];

const CoursesPage = () => {
    const onChange = (key) => {
        console.log(key);
    };
    return (
        <Flex vertical gap={14}>
            <Search
                variant="filled"
                size="large"
                placeholder="Поиск по потокам"
                allowClear
                onSearch={onChange}
                className="w-1/2"
            />
            <Tabs className="w-full" items={items} onChange={onChange}/>
        </Flex>
    )
}

export default CoursesPage;