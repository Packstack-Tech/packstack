import styled from 'styled-components';

export const StatWrapper = styled.div`
  p {
    color: ${props => props.theme.color.$Dark};
    margin-bottom: 8px;
  }
`;

export const StatCollection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 16px 0 16px;
`;