import React, { useState, useContext, useEffect } from "react";
import { Statistic, Card, Button, Flex, Rate, Modal, Typography, Input } from "antd";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import wordForm from "../../utils/wordForming";
import { postMeetingReview } from "../../api/meetings";
import useAxios from "../../utils/UseAxios";
import NotificationContext from "../../context/NotificationContext";

dayjs.extend(duration);

const { Countdown } = Statistic;
const { Text, Title } = Typography;
const { TextArea } = Input;
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

const MeetingStatusCard = ({ overview, overviewLoading, getUserOverview }) => {
    const api = useAxios();
    const { prev_meeting, is_prev_reviewed, next_meeting } = overview;
    const [formatDate, setFormatDate] = useState("D H m");
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [reviewValue, setReviewValue] = useState(4);
    const [reviewText, setReviewText] = useState('');
    const { setNotification } = useContext(NotificationContext);

    const handleCountChange = (e) => {
        setFormatDate(formatter(e));
    };
    
    const handleRateChange = async (value) => {
        setReviewValue(value);
        setReviewModalOpen(true);
    }

    const handleTextChange = async (e) => {
        setReviewText(e.target.value);
    }

    const handleCancel = async () => {
        setReviewModalOpen(false);
    }

    const handleReviewSubmit = async (e) => {
        try {
            const payload = {
                meeting: prev_meeting.id,
                stars: reviewValue,
                comment: reviewText,
            }
            const data = await postMeetingReview(api, payload);
            setNotification({
                type: "success",
                content: "Отзыв о занятии оставлен. Спасибо!"
            });
        } catch (error) {
            let content = "Не удалось оставить отзыв о встрече."
            if (error.response?.data?.non_field_errors[0] === 'Оценка уже оставлена.')
                content += " Отзыв уже был оставлен.";
            setNotification({
                type: "error",
                content: content
            });
        } finally {
            setReviewModalOpen(false);
            await getUserOverview(api);
        }
    }

    return (
        <Card bordered={false} loading={overviewLoading}>
            <Modal
                title={`${prev_meeting?.title}: (${dayjs(prev_meeting?.meeting_start_date).format('YYYY-MM-DD HH:mm')})`}
                open={reviewModalOpen}
                onCancel={handleCancel}
                onOk={handleReviewSubmit}
                okText="Отправить"
            >
                <Title className="mt-5" level={5}>Оцените встречу:</Title>
                <Rate value={reviewValue} onChange={handleRateChange} />
                <Title className="mt-2" level={5}>Напишите комментарий (не обязательно):</Title>
                <TextArea
                    showCount
                    maxLength={100}
                    placeholder="Опишите положительные и отрицательные стороны прошедшей встречи"
                    onChange={handleTextChange}
                    style={{
                        height: 120,
                        resize: 'none',
                        marginBottom: 20,
                    }}
                />
            </Modal>
            <Flex gap={16} wrap justify="space-between">
                {is_prev_reviewed && next_meeting ? (
                    <>
                        <Countdown 
                            loading={overviewLoading}
                            title="До ближайшей встречи" 
                            value={next_meeting.meeting_start_date} 
                            onChange={handleCountChange}
                            format={formatDate} 
                        />
                        <Button>Перейти</Button>
                    </>
                ) : !is_prev_reviewed && prev_meeting ? (
                    <>
                        <Statistic
                            loading={overviewLoading}
                            title="Оцените прошлую встречу"
                            value={prev_meeting.title}
                        />
                        <Rate value={reviewValue} onChange={handleRateChange} />
                    </>
                ) : (
                    <Statistic
                        loading={overviewLoading}
                        title="Вам доступно более"
                        value={`${12} встреч`}
                    />
                )}
            </Flex>
        </Card>
    )
}

export default MeetingStatusCard;