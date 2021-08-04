import styled from "styled-components";

export const SidebarWrapper = styled.div`
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: #FFF;
  border-left: 2px solid ${props => props.theme.color.$GrayBorder};
  
  @media screen and (max-width: ${props => props.theme.layout.$MobileWidth - 1}px) {
    width: 100%;
  }
`;

export const Content = styled.div`
  height: 100%;
`;

export const Header = styled.div`
  color: ${props => props.theme.color.$LightBlue};
  margin: 24px 16px 0;
  padding-bottom: 8px;
  font-family: "Roboto Condensed", sans-serif;
  font-size: 1.35em;
  font-weight: 700;
  text-transform: uppercase;
  border-bottom: 4px solid ${props => props.theme.color.$Dark};
`;
