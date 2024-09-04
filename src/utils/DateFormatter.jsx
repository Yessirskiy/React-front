import dayjs from "dayjs";
import wordForm from "./wordForming";

export const getDateFormatted = (raw) => {
    const selectedDate = raw ? raw.toDate() : null;
    if (selectedDate) {
        const formattedDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
        return formattedDate;
    }
    return null;
};

export const durationFormat = (duration) => {
    if (duration.months() >= 1){
        if ((duration.weeks() % 4) >= 1){
            return `M ${wordForm(duration.months(), "месяц", "месяца", "месяцов")} W ${wordForm(duration.weeks(), "неделя", "недели", "недель")}`;
        } else {
            return `M ${wordForm(duration.months(), "месяц", "месяца", "месяцов")}`;
        }
    } else if (duration.weeks() >= 1) {
        if ((duration.days() % 7) >= 1) {
            return `${Math.floor(duration.asDays() / 7)} ${wordForm(duration.weeks(), "неделя", "недели", "недель")} D ${wordForm(duration.days(), "день", "дня", "дней")}`;
        } else {
            return `${Math.floor(duration.asDays() / 7)} ${wordForm(duration.weeks(), "неделя", "недели", "недель")}`;
        }
    } else if (duration.days() >= 1) {
        if ((duration.hours() % 24) >= 1) {
            return `D ${wordForm(duration.days(), "день", "дня", "дней")} H ${wordForm(duration.hours(), "час", "часа", "часов")}`;
        } else {
            return `D ${wordForm(duration.days(), "день", "дня", "дней")}`;
        }
    } else if (duration.hours() >= 1) {
        if ((duration.minutes() % 60) >= 1) {
            return `H ${wordForm(duration.hours(), "час", "часа", "часов")} m ${wordForm(duration.minutes(), 'минута', 'минуты', 'минут')}`;
        } else {
            return `H ${wordForm(duration.hours(), "час", "часа", "часов")}`;
        }
    } else if (duration.minutes() >= 1) {
        return `m ${wordForm(duration.minutes(), 'минута', 'минуты', 'минут')}`;
    } else {
        return "";
    }
}

export const StringToDate = (raw) => {
    if (raw)
        return dayjs(new Date(raw));
    return null;
}