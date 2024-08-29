import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Row, Col, Divider, Skeleton } from "antd";
import useAxios from "../../utils/UseAxios";
import NotificationContext from "../../context/NotificationContext";
import { getArticle } from "../../api/news";

const { Title, Text } = Typography

const ArticlePage = () => {
    const api = useAxios();
    const params = useParams();
    const { setNotification } = useContext(NotificationContext);
    const [article, setArticle] = useState(null);
    const [articleLoading, setArticleLoading] = useState(true);

    const getNewsArticle = async () => {
        setArticleLoading(true);
        try {
            const data = await getArticle(api, params.articleId);
            setArticle(data);
            setArticleLoading(false);
        } catch (error) {
            setNotification({
                type: "error",
                content: "Не удалось загрузить новость."
            });
        }
    }

    useEffect(() => {
        getNewsArticle();
    }, []);

    return (
        <div>
            <Row justify="center">
                <Col 
                    xs={24} sm={22} md={22} 
                    lg={20} xl={20} xxl={20}
                >
                    <Title level={2}>{article?.title}</Title>
                    <Divider/>
                    <div className="flex flex-col gap-2 text-lg" dangerouslySetInnerHTML={{__html: article?.body}}></div>
                </Col>
            </Row>
        </div>
        
    )
}

export default ArticlePage;