import React, { useContext, useEffect, useState } from "react";
import { List, Typography, Avatar, Space } from "antd";
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { NavLink, Link } from "react-router-dom";
import { getArticles } from "../../api/news";
import useAxios from "../../utils/UseAxios";
import NotificationContext from "../../context/NotificationContext";
import dayjs from "dayjs";

const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

const { Text } = Typography;

const NewsLayout = ({filter}) => {
    const api = useAxios();
    const [articlesPagination, setArticlesPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [articles, setArticles] = useState([]);
    const { setNotification } = useContext(NotificationContext);

    const getNews = async (pagination) => {
        try {
            const data = await getArticles(api, pagination.current, pagination.pageSize, filter);
            setArticles(data.results);
            setArticlesPagination({
                ...pagination,
                total: data.count,
            })
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

    return (
        <List
            itemLayout="vertical"
            size="large"
            className='h-screen'
            pagination={articlesPagination}
            dataSource={articles}
            renderItem={(item) => (
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
                    title={<Link state={{nav: `meetings_news_${item.title}`}} to={`/meetings/news/${item.id}/`}>{item.title}</Link>}
                    description={
                        <div className="flex flex-col">
                            <p>{item.description}</p>
                            <Link state={{nav: `meetings_news_${item.title}`}} to={`/meetings/news/${item.id}/`}>Открыть</Link>
                        </div>
                    }
                  />
                  {item.content}
                </List.Item>
              )}
        >
        </List>
    )
}

export default NewsLayout;