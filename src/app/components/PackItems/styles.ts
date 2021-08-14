import styled from 'styled-components';

export const ItemRow = styled.div`
  padding-bottom: 4px;
  padding-top: 4px;
  border-bottom: 1px dashed ${props => props.theme.color.$GrayBorder};
  
  .remove-item {
    font-size: 18px;
    transition: .1s color;
    color: ${props => props.theme.hexOpacity(props.theme.color.$GrayBlue, 20)};
    
    &:hover {
      color: ${props => props.theme.hexOpacity(props.theme.color.$Red, 70)};
    }
  }
  
  .add-notes {
    display: block;
    font-size: 12px;
    margin-top: 2px;
  }
`;

export const WornIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  
  svg {
    fill: #CCC;
    width: 20px;
  }
  
  &.display svg {
    fill: #EEE;
    height: 20px;
  }  
  
  &.active svg {
    fill: ${props => props.theme.color.$Orange};
  }
`;

