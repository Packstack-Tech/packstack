import * as React from "react";
import { Button, Tooltip } from "antd";

interface FloatingActionButtonProps {
  onClick: () => void;
  icon: JSX.Element;
  tooltip?: string;
}

const styles: React.CSSProperties = {
  position: "fixed",
  right: "30px",
  bottom: "2%",
};

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onClick,
  icon,
  tooltip,
}) => {
  return (
    <Tooltip title={tooltip} placement="left">
      <Button
        icon={icon}
        type="primary"
        shape="circle"
        size="large"
        onClick={onClick}
        style={styles}
      ></Button>
    </Tooltip>
  );
};

export default FloatingActionButton;
