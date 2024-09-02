import { createContext, useState, useEffect } from "react";
import { message } from "antd";

const NotificationContext = createContext();

export default NotificationContext;

export const NotificationProvider = ({children}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [notification, setNotification] = useState(null);

    let contextData = {
        setNotification: setNotification,
    }

    useEffect(() => {
        if (notification) {
            messageApi.open(notification);
            setNotification(null);
        }
    }, [notification, messageApi]);

    return (
        <NotificationContext.Provider value={contextData}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    )
}