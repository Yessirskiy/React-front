import React, { useEffect, useState, useContext } from 'react';
import { Table, Empty } from 'antd';
import { getTransactions } from '../../api/balance';
import useAxios from '../../utils/UseAxios';
import dayjs from 'dayjs';
import NotificationContext from '../../context/NotificationContext';

const TransactionsTable = () => {
    const api = useAxios();
    const { setNotification } = useContext(NotificationContext);
    const [transactions, setTransactions] = useState([]);
    const [tableLoading, setTableLoading] = useState(true);
    const [tablePagination, setTablePagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const fetchTransactions = async (pagination) => {
        setTableLoading(true);
        try {
            const data = await getTransactions(api, pagination.current);
            setTransactions(data.results);
            setTablePagination({
                ...pagination,
                total: data.count,
            });
        } catch (error) {
            setNotification({
                type: 'error',
                content: "Не удалось получить список транзакций."
            });
        } finally {
            setTableLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions(tablePagination);
    }, []);

    const columns = [
        {
            title: 'Дата',
            dataIndex: 'date',
            key: 'date',
            render: (text) => {
                const date = new Date(text);
                return dayjs(date).format('YYYY-MM-DD HH:mm:ss'); 
            },
            width: "20%",
        },
        {
            title: 'Описание',
            dataIndex: 'description',
            key: 'description',
            responsive: ['sm'],
        },
        {
            title: 'Сумма',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => (
                <span style={{ color: amount < 0 ? 'red' : 'green' }}>
                {amount < 0 ? `-  ₽${Math.abs(amount)}` : `+ ₽${amount}`}
                </span>
            ),
        },
    ];

    const handleTableChange = async (pagination) => {
        fetchTransactions(pagination);
    }

    return (
        <Table
            columns={columns}
            loading={tableLoading}
            dataSource={transactions}
            pagination={tablePagination}
            onChange={handleTableChange}
            rowKey={(record) => record.id}
            locale={{
                emptyText: <Empty description="Nет транзакций"></Empty>,
            }}
        />
    );
};

export default TransactionsTable;
