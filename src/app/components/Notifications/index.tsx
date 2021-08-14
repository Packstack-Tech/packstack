import { notification } from 'antd';

interface NotificationProps {
    message: string;
    description?: string;
    duration?: number | null;
}

export const alertSuccess = (props: NotificationProps) => {
    notification.success({
        message: props.message,
        description: props.description
    });
};

export const alertWarn = (props: NotificationProps) => {
    notification.warn({
        message: props.message,
        description: props.description
    });
};

export const alertError = (props: NotificationProps) => {
    notification.error({
        message: props.message,
        description: props.description
    });
};