import styled from 'styled-components';

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ModalTitle = styled.div`
  font-size: 1em;
  font-weight: 900;
  color: ${props => props.theme.color.$Dark};
`;
