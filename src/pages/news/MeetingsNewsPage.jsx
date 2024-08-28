import React from "react";
import { Tabs, Input, Flex} from 'antd';
import NewsLayout from "./NewsLayout";

const items = [
    {
        key: 'alerts',
        label: 'Объявления',
        children: <NewsLayout filter='alerts'/>,
    },
    {
        key: 'events',
        label: 'Мероприятия',
        children: <NewsLayout filter='events'/>,
    },
    {
        key: 'rest',
        label: 'Остальное',
        children: <NewsLayout filter='rest'/>,
    },
];

const { Search } = Input;

const MeetingsNewsPage = () => {
    const onChange = (key) => {
        console.log(key);
    };
    return (
        <div>
            <Flex vertical gap={14}>
                <Search
                    variant="filled"
                    size="large"
                    placeholder="Введите интересующий запрос"
                    allowClear
                    onSearch={onChange}
                    className="w-1/2"
                />
                <Tabs className='w-full' defaultActiveKey="1" items={items} onChange={onChange} />
            </Flex>
        </div>
    )
}

export default MeetingsNewsPage;