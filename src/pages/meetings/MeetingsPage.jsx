import React from "react";
import { Tabs, Input, Flex } from 'antd';
import MeetingsLayout from "./MeetingsLayout";


const { Search } = Input

const items = [
  {
    key: 'feed',
    label: 'Подборка',
    children: <MeetingsLayout/>,
  },
  {
    key: 'attended',
    label: 'Посещенные',
    children: <MeetingsLayout/>,
  },
  {
    key: 'saved',
    label: 'Сохраненные',
    children: <MeetingsLayout/>,
  },
];

const MeetingsPage = () => {
    const onChange = (key) => {
        console.log(key);
    };
    return (
        <Flex vertical gap={14}>
            <Search
                variant="filled"
                size="large"
                placeholder="Поиск по встречам"
                allowClear
                onSearch={onChange}
                className="w-1/2"
            />
            <Tabs className="w-full" items={items} onChange={onChange}/>
        </Flex>
    )
}

export default MeetingsPage;