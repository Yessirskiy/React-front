import React, { useContext, useEffect, useState } from "react";
import { Carousel, Card, Flex, Typography } from "antd";
import useAxios from "../../utils/UseAxios";
import { getArticles } from "../../api/news";
import NotificationContext from "../../context/NotificationContext";
import dayjs from "dayjs";

const { Text } = Typography

const NewsCarousel = () => {
    const api = useAxios();
    const { setNotification } = useContext(NotificationContext);
    const [cards, setCards] = useState([<Card/>]);
    const [cardsLoading, setCardsLoading] = useState(true);

    const fetchLatestNews = async () => {
        setCardsLoading(true);
        try {
            const response = await getArticles(api, 1, 5);
            setCards(response.results);
            setCardsLoading(false);
        } catch (error) {
            setNotification({
                type: "error",
                content: "Не удалось получить новости."
            });
        }
    };

    useEffect(() => {
        fetchLatestNews();
    }, []);

    return (
        <Carousel autoplay autoplaySpeed={10000}>
            {cards.map((card) => (
            <div key={card.id} className="h-full mb-7">
                <Card
                    bordered={false}
                    loading={cardsLoading}
                    title={card.title}
                >
                    <Text className="text-base">{card.description}</Text>
                    <Flex wrap justify="space-between" className="mt-5">
                        <Text 
                            className="text-sm text-gray-300"
                        >
                            Создано: {dayjs(card.publication_date).format('YYYY-MM-DD HH:mm')}
                        </Text>
                        {card.is_edited && <Text 
                            className="text-sm text-gray-300"
                        >
                            Исправлено: {dayjs(card.edited_date).format('YYYY-MM-DD HH:mm')}
                        </Text>}
                    </Flex>
                </Card>
            </div>
            ))}
        </Carousel>
    )
}

export default NewsCarousel;