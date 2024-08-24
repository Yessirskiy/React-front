import React, { useState, useContext, useEffect } from "react";
import { Statistic, Card } from "antd";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

function wordform(number, nominative, genitiveSingular, genitivePlural) {
    if (number % 10 === 1 && number % 100 !== 11) {
      return nominative;
    } else if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
      return genitiveSingular;
    } else {
      return genitivePlural;
    }
}

function formatter(date) {
    const duration = dayjs.duration(date);

    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    if (days > 0) {
        return `D ${wordform(days, 'день', 'дня', 'дней')} H ${wordform(hours, 'час', 'часа', 'часов')}`;
    } else if (hours > 0) {
        return `H ${wordform(hours, 'час', 'часа', 'часов')} m ${wordform(minutes, 'минута', 'минуты', 'минут')}`;
    } else {
        return `m ${wordform(minutes, 'минута', 'минуты', 'минут')} s ${wordform(seconds, 'секунда', 'секунды', 'секунд')}`
    }
}

const MeetingStatusCard = () => {
    const [valueLoading, setValueLoading] = useState(true);
    const [formatDate, setFormatDate] = useState("D H m");

    const handleCountChange = (e) => {
        setFormatDate(formatter(e));
    }

    return (
        <Card>
            <Countdown 
                title="До ближайшей встречи" 
                value={deadline} 
                onChange={handleCountChange}
                format={formatDate} />
        </Card>
    )
}

export default MeetingStatusCard;