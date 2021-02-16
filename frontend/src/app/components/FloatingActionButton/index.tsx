import * as React from 'react';
import { Button, Tooltip } from "antd";

interface FloatingActionButtonProps {
	visible: boolean;
	onClick: () => void;
    icon: string;
    tooltip?: string;
}

const styles: React.CSSProperties = {
    position: 'fixed',
    width: '50px',
    height: '50px',
    right: '30px',
    bottom: '1%',
    borderRadius: '50px',
    textAlign: 'center',
    boxShadow: '2px 2px 3px #999',
    fontSize: '20px'
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ visible, onClick, icon , tooltip}) => {
  return <Tooltip title={tooltip} placement="left">
            <Button 
                icon={icon}
                type="primary"
                onClick={onClick}
                style={styles}>
            </Button>
        </Tooltip>
};

export default FloatingActionButton;