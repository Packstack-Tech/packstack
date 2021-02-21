import styled from 'styled-components';
import { theme } from 'styles/theme';

export const ItemRow = styled.div`
  padding-bottom: 8px;
  margin: 8px 0;
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

type isDragging = {
  isDragging? : boolean;
}
export const DroppableLocation = styled.div<isDragging>`
  @keyframes fade-in {
    from {
      background: inherit;
    }
    to {
      background: ${theme.hexOpacity("#F58763", 15)};
    }
  }  
  background: ${props => props.isDragging ? theme.hexOpacity("#F58763", 15) : ''}; 
  animation-name: ${props => props.isDragging ? 'fade-in' : ''};
  animation-duration: .5s;
  border-radius: 10px;
`;

