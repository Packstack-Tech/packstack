import * as React from "react";
import { Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { SharedInputProps } from "./types";
import { Error, Label, Row } from "./styles";
import { helpIconStyles } from "styles/common";

const errorMessage = (error?: boolean, errorMsg?: string, label?: string) => {
  if (!error) return null;
  const message = errorMsg || `${label} is required.`;
  return <Error>{message}</Error>;
};

const tooltip = (tip: string) => (
  <Tooltip
    title={tip}
    mouseEnterDelay={0.1}
    style={{ padding: "8px", textAlign: "center" }}
  >
    <QuestionCircleOutlined style={helpIconStyles} />
  </Tooltip>
);

export const InputContainer: React.FC<SharedInputProps> = ({
  label,
  errorMsg,
  error,
  tip,
  last,
  style,
  children,
  labelStyle,
}) => (
  <Row className={last ? "last" : ""} style={style}>
    {label && (
      <Label style={labelStyle}>
        {label}
        {tip && tooltip(tip)}
      </Label>
    )}
    {children}
    {errorMessage(error, errorMsg, label)}
  </Row>
);
