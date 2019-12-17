import styled from 'styled-components';
import { Grid } from "styles/common";

export const HomeContainer = styled.div`
    width: 100%;
    color: #fff;
    font-family: "Lato", sans-serif;
    background-color: ${props => props.theme.color.$Black};
    
    .primary-link {
      color: #fff;
      display: inline-block;
      border: 1px solid rgba(255,255,255,.75);
      background-color: rgba(0,0,0,.1);
      border-radius: 3px;
      font-weight: 900;
      font-size: 18px;
      padding: 8px 48px;
      transition: .1s background-color, .1s border-color;
      
      &:hover {
        border: 1px solid rgba(255,255,255,.85);
        background-color: rgba(0,0,0,.4);
      }
    }
`;

export const TopContainer = styled.div`
  background: center center no-repeat url("/packstack_bg.jpg");
  background-size: cover;
`;

export const BottomContainer = styled.div`
  margin: 100px auto 0;
  max-width: 990px;
  padding: 0 20px 100px;
  
  h2 {
    color: #fff;
    margin-bottom: 16px;
    font-weight: 900;
    font-size: 24px;
    font-family: "Lato", sans-serif;
  }
  
  p {
    color: #D4D3D6;
    font-size: 18px;
    font-family: "Lato", sans-serif;
  }
  
  ${Grid} {
    margin: 80px 0 160px;
  }
  
  img {
    max-width: 640px;
    width: 100%;
    border-radius: 3px;
    border: 2px solid #FFF;
  }
`;

export const Top = styled.div`
  text-align: center;
  padding: 140px 20px 250px;
  
  .title {
    font-size: 52px;
    font-weight: 900;
    margin-bottom: 24px;
  }
  
  h1 {
    color: #fff;
    font-size: 22px;
    line-height: 1.45em;
    margin-bottom: 40px;
    font-family: "Lato", sans-serif;
    font-weight: 400;
  }
  
  @media (max-width: ${props => props.theme.layout.$MobileWidth}px) {
  
    h1 {
      font-size: 18px;
      
      br {
        display: none;
      }
    }
    .title {
      font-size: 28px;
    }
  }
`;