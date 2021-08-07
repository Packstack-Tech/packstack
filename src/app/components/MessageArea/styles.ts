import styled from "styled-components";

export const MessageContainer = styled.div`
  padding: 64px;
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
  text-align: center;
  line-height: 1.5rem;
  border-radius: 4px;
  color: ${props => props.theme.hexOpacity(props.theme.color.$orange, 80)};
  border: 1px solid ${props => props.theme.hexOpacity(props.theme.color.$orange, 20)};
  background-color: ${props => props.theme.hexOpacity(props.theme.color.$orange, 8)};
  box-shadow: inset 0 0 10px ${props => props.theme.hexOpacity(props.theme.color.$orange, 15)};
`;