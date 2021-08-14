import styled from 'styled-components';
import { Box } from "styles/common";

export const AuthPage = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #E9ECF2;
`;

export const AuthWrapper = styled.div`
    margin: 0 auto;
    padding: 48px 0;
    max-width: 600px;
    width: 100%;
    
    h1 {
      color: ${props => props.theme.color.$Black};
      text-transform: uppercase;
      font-size: 1.75rem;
      font-weight: 700;
      font-family: "Roboto Condensed", sans-serif;
      margin-bottom: 24px;
    }
    
    ${Box} {
      padding: 40px 48px;
    }
`;

export const BottomTray = styled.div`
  margin-top: 16px;
  
  a {
    margin-right: 16px;
  }
`;
