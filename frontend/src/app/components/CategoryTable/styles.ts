import styled from 'styled-components';

export const CatTableWrapper = styled.div`
  padding: 0 16px;
  margin-bottom: 16px;
`;

export const CatRow = styled.div`
  padding: 8px 2px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed ${props => props.theme.hexOpacity(props.theme.color.$GrayBlue, 20)};
  color: ${props => props.theme.color.$Dark};
  
  > div {
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
  }
  
  &:hover {
     background-color: #F0F7FA;
  }
  
  span {
    display: inline-block;
    margin-right: 8px;
    height: 8px;
    width: 8px;
    border-radius: 4px;
  }
  
  &.totals {
    > div {
      font-weight: 700;
    }
    &.highlight {
      background-color: #fcfcfc;
    }
  }
`;
