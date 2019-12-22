import styled from 'styled-components';

export const LogoWrapper = styled.div`
  margin-bottom: 48px;
`;

export const LogoImg = styled.img`
  max-width: 100%;
`;

export const MobileNav = styled.div``;

export const NavItem = styled.a`
  font-family: "Roboto Condensed", sans-serif;
  font-weight: 600;
  font-size: 14px;
  display: block;
  text-transform: uppercase;
  padding: 4px 0;
  margin: 4px 0;
  color: ${props => props.theme.color.$Dark};
  transition: .2s color;
    
  &:hover {
    color: ${props => props.theme.color.$Orange};
  }
`;

export const NavBottom = styled.div`
  margin-top: auto;
  
  a {
    font-family: "Roboto Condensed", sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    display: inline-block;
    margin-top: 8px;
  }
  
  .logout {
    color: #BBB;
    padding-top: 0;
    
    &:hover {
      color: ${props => props.theme.color.$Dark};
    }
  }
`;

export const Navigation = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 100px);
  
  button {
    font-weight: 700;
  }
  
  button:not(.ant-btn-primary) {
    color: ${props => props.theme.color.$darkBlue};
    
    &:hover {
      color: ${props => props.theme.color.$blue};
    }
    
    &:focus {
      color: ${props => props.theme.color.$darkBlue};
    }
  }
`;

export const HeaderWrapper = styled.div`
  max-width: ${props => props.theme.layout.$SidebarWidth}px;
  padding: 16px;
  border-top: 4px solid ${props => props.theme.color.$Orange};
  border-right: 2px solid ${props => props.theme.color.$GrayBorder};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 99;
  background-color: white;
  
  @media screen and (min-width: ${props => props.theme.layout.$MobileWidth}px) {
    ${MobileNav} {
      display: none;
    }
  }
  
  @media screen and (max-width: ${props => props.theme.layout.$MobileWidth - 1}px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    bottom: auto;
    right: 0;
    max-width: 100%;
    border-right: 0;
    border-bottom: 2px solid ${props => props.theme.color.$Gray};
    
    ${LogoWrapper} {
      margin-bottom: 0;
    }
    
    ${LogoImg} {
      max-width: 80px;
    }
    
    ${Navigation} {
      display: none;
    }
  }
`;