import * as React from "react";
import { CaretDownFilled, CaretRightFilled } from "@ant-design/icons";

interface CaretProps {
  visible: boolean;
  onClick: () => void;
}

const Caret: React.FC<CaretProps> = ({ visible, onClick }) => {
  const props = {
    onClick,
    style: { position: "absolute" as "absolute", top: 11, right: 5 },
  };

  return visible ? (
    <CaretDownFilled {...props} />
  ) : (
    <CaretRightFilled {...props} />
  );
};

export default Caret;
