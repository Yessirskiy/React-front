import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Col, Statistic, Typography, Divider } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { getBalance } from '../../api/balance';
import useAxios from '../../utils/UseAxios';
import TransactionsTable from './TransactionsTable';
import { NotificationProvider } from '../../context/NotificationContext';

const { Title } = Typography;

const BalancePage = () => {
    const api = useAxios();
    const [balance, setBalance] = useState(null);
    const [balanceLoading, setBalanceLoading] = useState(true);

    const fetchBalance = async () => {
        setBalanceLoading(true);
        try {
            const data = await getBalance(api);
            setBalance(data.current);
        } catch (error) {
            setBalance('-');
            console.log(error);
        } finally {
            setBalanceLoading(false);
        }
    };

    useEffect(() => {
        fetchBalance();
    }, []);

    return (
        <NotificationProvider style={{ padding: '24px' }}>
            <Title level={2}>Баланс</Title>
            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={8}>
                <Card>
                    <Statistic
                        title="Текущий баланс"
                        value={balance}
                        loading={balanceLoading}
                        precision={2}
                        valueStyle={{ color: balance < 0 ? 'red' : 'green' }}
                        prefix="₽"
                    />
                </Card>
                </Col>
                <Col span={8}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => addTransaction('Bonus', 500)}
                    block
                >
                    Add Income
                </Button>
                </Col>
                <Col span={8}>
                <Button
                    type="danger"
                    icon={<MinusOutlined />}
                    onClick={() => addTransaction('Expense', -200)}
                    block
                >
                    Add Expense
                </Button>
                </Col>
            </Row>
            <Divider />
            <TransactionsTable/>
        </NotificationProvider>
    );
};

export default BalancePage;
