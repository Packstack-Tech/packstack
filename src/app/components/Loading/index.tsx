import * as React from "react"
import { Spin } from "antd"

interface LoadingProps {
  size: "small" | "default" | "large"
}

const Loading: React.FC<LoadingProps> = ({ size }) => {
  const defaultStyles: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
  const wrapperStyles: { [key: string]: React.CSSProperties } = {
    small: { ...defaultStyles },
    default: { ...defaultStyles, height: "80px" },
    large: { ...defaultStyles, height: "120px" },
  }
  const style = wrapperStyles[size]
  return (
    <div style={style}>
      <Spin size={size} />
    </div>
  )
}

export default Loading
