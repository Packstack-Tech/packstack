import styled from 'styled-components';
import { InventoryItem } from "app/components/InventorySidebar/styles";

export const Container = styled.div`
  display: flex;
  margin-left: ${props => props.theme.layout.$SidebarWidth}px;
  
  @media screen and (max-width: ${props => props.theme.layout.$MobileWidth - 1}px) {
    margin-left: 0;
    display: block;
  }
`;

export const Box = styled.div`
  padding: 24px;
  border: 1px solid ${props => props.theme.color.$GrayBorder};
  box-shadow: 2px 2px 2px rgba(0,0,0,.05);
  border-radius: 2px;
  background-color: #fff;
`;

export const SidebarContainer = styled.div`
  padding: 16px;
`;

export const PageWrapper = styled.div`
  max-width: 1600px;
  margin: 40px auto 0;
  padding: 0 48px;
  flex: 1;
  
  @media screen and (max-width: 660px) {
    margin-top: 80px;
    padding: 0 8px;
  }
`;

export const PageTitle = styled.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  
  h1 {
    font-family: "Lato", sans-serif;
    color: ${props => props.theme.color.$Black};
    font-weight: 900;
    font-size: 1.75rem;
    margin-bottom: 8px;
  }
  
  @media screen and (max-width: 660px) {
    flex-direction: column;
  }
`;

export const PageDescription = styled.div`
  color: #999;
  font-size: 18px;
`;

export const SectionHeader = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: minmax(auto, auto) 80px 10px;
  padding: 8px 20px 8px 8px;
  border-radius: 2px;
  border-bottom: 3px solid ${props => props.theme.hexOpacity(props.theme.color.$GrayBlue, 5)};
  background-color: ${props => props.theme.color.$LightGray};
  
  h3 {
    font-family: "Roboto Condensed", sans-serif;
    color: ${props => props.theme.color.$Dark};
    font-size: 14px;
    text-transform: uppercase;
    margin-bottom: 0;
    padding-top: 5px;
    padding-left: 5px;
    float: left;
  }
  strong {
    text-align:right;
    padding-top:5px;
  }
`;

export const Controls = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const CategoryGroup = styled.div` 
  padding-bottom: 24px;
  ${InventoryItem}:last-of-type {
    border-bottom: none;
  }
`;

export const InventoryContainer = styled.div`
  ${CategoryGroup}:first-of-type h3 {
    border-top: 0;
  }
`;

export const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  
  .quarter {
    width: 25%;
  }
  
  .half {
    width: 50%;
  }
  
  .three-quarters {
    width: 75%;
  }
  
  .third {
    width: 33%;
  }
  
  .forty {
    width: 40%;
  }
  
  .sixty {
    width: 60%;
  }
  
  .two-thirds {
    width: 66%;
  }
  
  &.narrow > div {
    margin: 0 12px;
  }
  
  > div {
    margin: 0 24px;
  }
  
  > div:first-of-type {
    margin-left: 0;
  }
  
  > div:last-of-type {
    margin-right: 0;
  }
  
  &.horizontal-center {
    align-items: center;
  }
  
  &.align-bottom {
    align-items: flex-end;
  }
  
  .align-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  
  @media (max-width: ${props => props.theme.layout.$MobileWidth}px) {
    flex-direction: column;
    
    > div {
      width: 100% !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
    
    &.column-reverse {
      flex-direction: column-reverse;
      
      > div {
        margin-bottom: 24px;
      }
    }
  }
`;

export const helpIconStyles = {
    fontSize: '10px',
    marginLeft: '8px',
    color: '#666'
};