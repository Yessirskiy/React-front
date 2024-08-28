import React, { useState, useContext, useEffect } from "react";
import { Statistic, Card, Button, Flex, Rate } from "antd";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import wordForm from "../../utils/wordForming";

dayjs.extend(duration);

const { Countdown } = Statistic;
// const deadline = Date.now() + 1000 * 60 * 60 * 24 * 5 + 1000 * 60 * 60 * 5 + 1000 * 30;

function formatter(date) {
    const duration = dayjs.duration(date);

    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    if (days > 0) {
        return `D ${wordForm(days, 'день', 'дня', 'дней')} H ${wordForm(hours, 'час', 'часа', 'часов')}`;
    } else if (hours > 0) {
        return `H ${wordForm(hours, 'час', 'часа', 'часов')} m ${wordForm(minutes, 'минута', 'минуты', 'минут')}`;
    } else {
        return `m ${wordForm(minutes, 'минута', 'минуты', 'минут')} s ${wordForm(seconds, 'секунда', 'секунды', 'секунд')}`
    }
}

const MeetingStatusCard = ({ meetings, next_meeting, is_prev_reviewed, prev_meeting }) => {
    const [valueLoading, setValueLoading] = useState(true);
    const [formatDate, setFormatDate] = useState("D H m");
    const [element, setElement] = useState(<>
        <Statistic
            title="Вам доступно более"
            value={`${12} встреч`}
        />
        <Button>К встречам</Button>
    </>);

    const handleCountChange = (e) => {
        setFormatDate(formatter(e));
    };

    useEffect(() => {
        if (is_prev_reviewed && next_meeting) {
            setElement(
            <>
                <Countdown 
                    loading={valueLoading}
                    title="До ближайшей встречи" 
                    value={deadline} 
                    onChange={handleCountChange}
                    format={formatDate} 
                />
                <Button>Перейти</Button>
            </>);
        } else if (!is_prev_reviewed && prev_meeting) {
            setElement(
                <>
                <Statistic
                    title="Оцените прошлую встречу"
                    value={prev_meeting.title}
                />
                <Rate defaultValue={4} onChange={handleRateChange}/>
                </>
            );
        }
    }, [next_meeting, is_prev_reviewed, prev_meeting]);
    
    const handleRateChange = async (v) => {
        console.log(v)
    }

    return (
        <Card bordered={false}>
            <Flex gap={16} wrap justify="space-between">
                {element}
            </Flex>
            
        </Card>
    )
}

export default MeetingStatusCard;