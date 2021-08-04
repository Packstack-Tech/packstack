import * as React from 'react';
import { Icon } from "antd";

interface CaretProps {
	visible: boolean;
	onClick: () => void;
}

const Caret: React.FC<CaretProps> = ({ visible, onClick }) => {
	const type = visible ? 'caret-down' : 'caret-right';
  return <Icon type={type} onClick={onClick} style={{ position: 'absolute', top: 11, right: 5}}/>
};

export default Caret;