import React, { useEffect, useState, useContext } from 'react';
import { Button, Card, Row, Col, Statistic, Typography, Divider, Flex } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { getBalance } from '../../api/balance';
import useAxios from '../../utils/UseAxios';
import NotificationContext from '../../context/NotificationContext';

const BalanceCard = () => {
    const api = useAxios();
    const { setNotification } = useContext(NotificationContext);
    const [balance, setBalance] = useState(null);
    const [valueLoading, setValueLoading] = useState(true);
    const [balanceLoading, setBalanceLoading] = useState(true);

    const fetchBalance = async () => {
        setBalanceLoading(true);
        setValueLoading(true);
        try {
            const data = await getBalance(api);
            setBalance(data.current);
            setValueLoading(false);
        } catch (error) {
            setNotification({
                type: "error",
                content: "Не удалось получить данные о балансе."
            })
        } finally {
            setBalanceLoading(false);
        }
    };

    useEffect(() => {
        fetchBalance();
    }, []);

    return (
        <Card loading={balanceLoading}>
            <Flex wrap gap='large' justify='space-between'>
                <Statistic
                    title="Текущий баланс"
                    value={balance}
                    loading={valueLoading}
                    precision={2}
                    valueStyle={{ color: balance < 0 ? 'red' : 'green' }}
                    prefix="₽"
                />
                <Button icon={<PlusOutlined />}>Пополнить</Button>
            </Flex>
        </Card>
    );
};

export default BalanceCard;
