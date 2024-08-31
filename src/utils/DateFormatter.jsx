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
    if (duration.minutes() === 0) {
        return `H ${wordForm(duration.hours(), "час", "часа", "часов")}`
    } else if (duration.hours() != 0) {
        return `H ${wordForm(duration.hours(), "час", "часа", "часов")} m ${wordForm(duration.minutes(), 'минута', 'минуты', 'минут')}`
    } else if (duration.hours() === 0) {
        return `m ${wordForm(duration.minutes(), 'минута', 'минуты', 'минут')}`
    }
}

export const StringToDate = (raw) => {
    if (raw)
        return dayjs(new Date(raw));
    return null;
}