import dayjs from "dayjs";

export const getDateFormatted = (raw) => {
    const selectedDate = raw ? raw.toDate() : null;
    if (selectedDate) {
        const formattedDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
        return formattedDate;
    }
    return null;
};

export const StringToDate = (raw) => {
    if (raw)
        return dayjs(new Date(raw));
    return null;
}