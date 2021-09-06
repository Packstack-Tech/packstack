import styled from "styled-components"

export const ButtonGroup = styled.div`
  width: 100%;
  margin-top: 48px;
  display: flex;
  justify-content: space-between;
`

export const ModalTitle = styled.div`
  font-size: 1em;
  font-weight: 900;
  color: ${(props) => props.theme.color.$Dark};
`
