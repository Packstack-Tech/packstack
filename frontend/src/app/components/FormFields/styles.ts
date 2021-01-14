import styled from 'styled-components';
import { StylesConfig } from "react-select/src/styles";
import { theme } from "styles/theme";

export const Input = styled.input`
    width: 100%;
    background-color: transparent;
    color: ${props => props.theme.color.$Dark};
    border: none;
    border-bottom: 1px solid ${props => props.theme.color.$GrayBorder};
    padding: 8px 0;
    line-height: 1em;
    transition: .2s border-color;
    font-size: 14px;
    font-family: "Open Sans", sans-serif;
    
    &:focus, &:hover {
      outline: none;
      border-color: ${props => props.theme.color.$DarkBlue};
    }
`;

export const TextareaInput = styled.textarea`
  min-width: 100%;
  min-height: 120px;
  resize: vertical;
  font-size: 14px;
  font-family: "Open Sans", sans-serif;
  padding: 8px;
  margin-top: 8px;
  transition: .2s border-color;
  border: 1px solid ${props => props.theme.color.$GrayBorder};
  border-radius: 4px;
  line-height: 1.5em;
  
  &:focus, &:hover {
    outline: none;
    border-color: ${props => props.theme.color.$DarkBlue};
  }
`;

export const Row = styled.div`
    margin-bottom: 16px;
    &.last {
      margin-bottom: 0;
    }
`;

export const Label = styled.h4`
    color: ${props => props.theme.color.$Dark};
    font-family: "Roboto Condensed", sans-serif;
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
    line-height: 1em;
    display: flex;
    align-items: center;
    height: 14px; // keeps rows consistent
    margin: 0;
`;

export const Error = styled.p`
  color: red;
  font-size: 12px;
  font-family: "Open Sans", sans-serif;
  line-height: 1.25em;
`;

export const selectStyles: StylesConfig = {
    control: (p, s) => ({
        ...p,
        border: 'none',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        borderRadius: 0,
        borderBottom: `1px solid ${theme.color.$GrayBorder}`,
        minHeight: '30px',
        minWidth: '60px',
        '&:hover': {
            cursor: 'pointer',
            borderBottom: `1px solid ${theme.color.$DarkBlue}`,
        }
    }),
    valueContainer: (p, s) => ({
        ...p,
        padding: 0
    }),
    input: (p, s) => ({
        ...p,
        fontSize: '14px',
        fontFamily: "Open Sans, sans-serif",
        padding: '6px 0',
    }),
    indicatorSeparator: (p, s) => ({
        display: 'none'
    }),
    indicatorsContainer: (p, s) => ({
        ...p,
        '> div': {
            padding: '6px'
        }
    }),
    singleValue: (p, s) => ({
        ...p,
        overflow: 'visible'
    }),
    placeholder: (p) => ({
        ...p,
        color: '#ccc'
    })
};

export const CharacterCounter = styled.small`
    float: right;
    &.full {
        color:red;
    }
`;