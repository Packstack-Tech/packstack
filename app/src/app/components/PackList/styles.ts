import styled from 'styled-components';

export const PackWrapper = styled.div`
  margin-bottom: 24px;
  padding-top: 24px;
  border-top: 1px dashed ${props => props.theme.color.$lightGrayBorder};
  
  p {
    margin: 16px 0;
    line-height: 1.5rem;
    white-space: pre-line;
  }
  
  a {
    display: inline-block;
  }
  
  .pack-link {
    font-family: "Lato", sans-serif;
    font-size: 1rem;
    font-weight: 900;
    color: ${props => props.theme.color.$LightBlue};
    
    &:hover {
      color: ${props => props.theme.color.$Dark};
    }
  }
`;

export const Metadata = styled.div`
  display: flex;
  margin-top: 12px;
  
  > div {
    margin-right: 10px;
    padding-right: 16px;
    font-family: "Open Sans", sans-serif;
    font-weight: 600;
    font-size: .9rem;
    color: ${props => props.theme.color.$GrayBlue};
    position: relative;
    
    &:after {
      position: absolute;
      right: 0;
      content: '•';
      color: ${props => props.theme.color.$GrayBlue};
    }
    
    &:last-of-type:after {
      display: none;
    }
  }
`;

export const UserOptions = styled.div`
  display: flex;
  margin-top: 8px;
  
  a {
    font-size: .9rem;
    margin-right: 12px;
  }
`;
