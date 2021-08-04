import styled from "styled-components";

export const InventoryItem = styled.div`
  padding: 8px 16px;
  border-bottom: 1px dashed #E7F0F3;
  background-color: #fff;
  transition: .2s background-color;
  
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.hexOpacity(props.theme.color.$Green, 25)};
  }
  
  &.selected {
    box-shadow: inset -54px 0 0 ${props => props.theme.hexOpacity(props.theme.color.$Green, 10)};
    
    &:hover {
      background-color: ${props => props.theme.hexOpacity(props.theme.color.$Red, 15)};
    }
  }
  
  h5 {
    margin-bottom: 0;
    font-family: "Open Sans", sans-serif;
    font-size: .75rem;
    line-height: 1.1rem;
    font-weight: 700;
    color: ${props => props.theme.color.$Dark};
  }
  
  p {
    margin: 0;
    color: #999;
    font-size: .7rem;
    line-height: 1.15rem;
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  > div:first-child {
    width: 100%;
  }
  
  > div:nth-child(2) {
    width: 40px;
    display: flex;
    justify-content: flex-end;
  }
  
  i {
    color: ${props => props.theme.hexOpacity(props.theme.color.$Green, 50)};
    font-size: 20px;
  }
`;

export const CategoryHeader = styled.div`
  padding: 6px 8px 6px 12px;
  border-radius: 2px 0 0 2px;
  margin-left: -3px;
  border-left: 4px solid ${props => props.theme.color.$GrayBlue};
  background-color: ${props => props.theme.color.$LightGray};
  
  h3 {
    font-family: "Roboto Condensed", sans-serif;
    color: ${props => props.theme.color.$Dark};
    font-size: 12px;
    text-transform: uppercase;
    margin-bottom: 0;
  }
`;

export const CategoryLabel = styled.div`
  display: inline-flex;
  align-items: center;
  
  div {
    color: ${props => props.theme.color.$Green};
    font-family: "Open Sans", sans-serif;
    font-weight: 700;
    font-size: .7rem;
    transition: .2s color;
  }
  
  i {
    margin-left: 8px;
    color: #DDD;
    font-size: 10px;
    transition: .2s color;
  }
  
  &:hover {
    cursor: pointer;
    div {
      color: ${props => props.theme.color.$GreenShade};
    }
    
    i {
      color: ${props => props.theme.color.$GreenShade};
    }
  }
`;
