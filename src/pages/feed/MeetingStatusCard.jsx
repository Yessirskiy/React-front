import React, { useState, useContext, useEffect } from "react";
import { Statistic, Card, Button, Flex } from "antd";
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

const MeetingStatusCard = ({ meetings }) => {
    const [valueLoading, setValueLoading] = useState(true);
    const [formatDate, setFormatDate] = useState("D H m");
    const [deadline, setDeadline] = useState(null);

    const getUpcomingMeeting = () => {
        console.log(meetings);
        setValueLoading(true);
        if (!meetings || meetings.length === 0)
            return;
        let next_meeting = null;
        const present = dayjs();
        console.log(next_meeting, present);
        meetings.forEach(meeting => {
            const meeting_date = dayjs(meeting.meeting_start_date);
            if (meeting_date > present && (!next_meeting || meeting_date < next_meeting)){
                next_meeting = meeting_date;
            }
        });
        if (next_meeting)
            setDeadline(next_meeting);
        setValueLoading(false);
    };

    const handleCountChange = (e) => {
        setFormatDate(formatter(e));
    };

    useEffect(() => {
        getUpcomingMeeting();
    }, [meetings]);

    return (
        <Card bordered={false}>
            <Flex gap={16} wrap justify="space-between">
                <Countdown 
                loading={valueLoading}
                title="До ближайшей встречи" 
                value={deadline} 
                onChange={handleCountChange}
                format={formatDate} />
                <Button>Перейти</Button>
            </Flex>
            
        </Card>
    )
}

export default MeetingStatusCard;