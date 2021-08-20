import styled from "styled-components"

export const LogoImg = styled.img`
  max-width: 140px;
`

export const MobileNav = styled.div``

export const DonateBtn = styled.a`
  font-weight: 700;
  color: ${(props) => props.theme.color.$Green} !important;
`

export const Navigation = styled.div`
  display: flex;
  align-items: center;

  button {
    font-weight: 700;
  }

  button:not(.ant-btn-primary) {
    color: ${(props) => props.theme.color.$darkBlue};

    &:hover {
      color: ${(props) => props.theme.color.$blue};
    }

    &:focus {
      color: ${(props) => props.theme.color.$darkBlue};
    }
  }
`

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-top: 4px solid #2a4c7e;
  border-bottom: 1px solid #eee;
  background-color: white;
  margin-bottom: 24px;

  @media screen and (min-width: ${(props) =>
      props.theme.layout.$MobileWidth}px) {
    ${MobileNav} {
      display: none;
    }
  }

  @media screen and (max-width: ${(props) =>
      props.theme.layout.$MobileWidth - 1}px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    bottom: auto;
    right: 0;
    max-width: 100%;
    border-right: 0;
    border-bottom: 2px solid ${(props) => props.theme.color.$Gray};

    ${LogoImg} {
      max-width: 80px;
    }

    ${Navigation} {
      display: none;
    }
  }
`
