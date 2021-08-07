import * as React from "react";
import { MessageContainer } from "./styles";

interface MessageAreaProps {}

export const MessageArea: React.FC<MessageAreaProps> = ({ children }) => (
    <MessageContainer>{children}</MessageContainer>
);