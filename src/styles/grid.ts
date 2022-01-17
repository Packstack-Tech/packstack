import { CSSProperties } from "react";
import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 2px 1fr 1fr 1fr 1fr 1fr .5fr .1fr;
  grid-template-rows: auto;
  grid-column-gap: 8px;
  align-items: center;

  .align-center {
    justify-self: center;
  }
  .align-right {
    justify-self: end;
  }
`;

export const PairGrid = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
  grid-template-rows: auto;
  grid-column-gap: 8px;
  align-items: center;
`;

export const inlineStyles: CSSProperties = {
  marginBottom: 0,
};

export const PackItemGrid = styled.div`
  display: grid;
  grid-template-columns: 30px 170px minmax(200px, auto) 70px 40px 70px 30px;
  grid-template-rows: auto;
  grid-column-gap: 16px;
  align-items: center;
  line-height: 1.25em;

  .align-right {
    justify-self: end;
  }

  .align-center {
    justify-self: center;
  }
`;

export const NotesIndicator = styled.div`
  display: flex;
  justify-content: space-between;

  svg {
    fill: #ccc;
    width: 20px;
  }

  &.active svg {
    fill: #34acd4;
    width: 20px;
  }
`;
