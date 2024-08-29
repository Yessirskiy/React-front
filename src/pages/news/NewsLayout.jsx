import React, { useContext, useEffect, useState } from "react";
import { List, Typography, Avatar, Space, Skeleton, Spin, Divider } from "antd";
import { LikeOutlined, MessageOutlined, StarOutlined, LoadingOutlined } from '@ant-design/icons';
import { NavLink, Link } from "react-router-dom";
import { getArticles } from "../../api/news";
import useAxios from "../../utils/UseAxios";
import NotificationContext from "../../context/NotificationContext";
import dayjs from "dayjs";


const { Text } = Typography;

const NewsLayout = ({filter}) => {
    const api = useAxios();
    const [articlesPagination, setArticlesPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [articles, setArticles] = useState([]);
    const [articlesLoading, setArticlesLoading] = useState(true);
    const { setNotification } = useContext(NotificationContext);

    const getNews = async (pagination) => {
        setArticlesLoading(true);
        try {
            const data = await getArticles(api, pagination.current, pagination.pageSize, filter);
            setArticles(data.results);
            setArticlesPagination({
                ...pagination,
                total: data.count,
            })
            setArticlesLoading(false);
        } catch (error) {
            setNotification({
                type: "error",
                content: "Не удалось получить новости."
            })
        }
    }

    useEffect(() => {
        getNews(articlesPagination);
    }, []);

    const skeletonItems = Array.from({ length: 3 }).map((_, index) => (
        <List.Item key={index}>
            <Skeleton active avatar title paragraph={{ rows: 3 }} />
        </List.Item>
    ));

    return (
        <List
            itemLayout="vertical"
            size="large"
            className='h-screen'
            pagination={articles.length > 0 ? articlesPagination : false}
            dataSource={articlesLoading && articles.length === 0 ? skeletonItems : articles}
            loading={false}
            renderItem={(item) => (
                !articlesLoading ? (
                <List.Item
                    key={item.title}
                    actions={[
                        <p>{dayjs(item.publication_date).format("YYYY-MM-DD HH:mm")}</p>,
                        item.is_edited && <p>Ред.: {dayjs(item.edited_date).format("YYYY-MM-DD HH:mm")}</p>,
                    ]}
                    //   extra={
                    //     <img
                    //       width={272}
                    //       alt="logo"
                    //       src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    //     />
                    //   }
                >
                    <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<Link state={{name: item.title}} to={`/meetings/news/${item.id}`}>{item.title}</Link>}
                        description={
                            <div className="flex flex-col">
                                <p>{item?.description}</p>
                                <Link state={{name: item.title}} to={`/meetings/news/${item.id}`}>Открыть</Link>
                            </div>
                        }
                    />
                </List.Item> 
                ) : (
                    <>
                        <Skeleton className="mb-5" active avatar title paragraph={{ rows: 2 }} />
                        <Divider/>
                    </>
                )
              )}
        >
        </List>
    )
}

export default NewsLayout;