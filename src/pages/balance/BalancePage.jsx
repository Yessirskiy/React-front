import React from 'react';
import { Row, Col, Typography, Divider } from 'antd';
import TransactionsTable from './TransactionsTable';
import BalanceCard from './BalanceCard';
import { NotificationProvider } from '../../context/NotificationContext';

const { Title } = Typography;

const BalancePage = () => {
    return (
        <NotificationProvider className='p-6'>
            <Title level={2}>Баланс</Title>
            <Row gutter={[28, 28]} className='mb-6'>
                <Col 
                    className='gutter-row'
                    xs={24} sm={20} md={16}
                    lg={12} xl={10} xxl={7} 
                >
                    <BalanceCard/>
                </Col>
            </Row>
            <Divider />
            <TransactionsTable/>
        </NotificationProvider>
    );
};

export default BalancePage;
