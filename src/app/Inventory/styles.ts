import styled from "styled-components";

export const UploadInputWrapper = styled.div`
  input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  
  label {
    color: #fff;
    background-color: ${props => props.theme.color.$Green};
    border-bottom: 2px solid ${props => props.theme.color.$GreenShade};
    font-weight: 700;
    font-size: 1.25em;
    letter-spacing: -.05em;
    padding: 12px 24px;
    border-radius: 4px;
    text-transform: uppercase;
    display: block;
    text-align: center;
    
    i {
      font-size: 20px;
    }
    
    &:hover {
      cursor: pointer;
      background-color: ${props => props.theme.color.$GreenShade};
    }
  }
`;

export const UploadInstructions = styled.div`
  p {
    line-height: 1.5em;
    font-size: 1.25em;
  }
  
  .upload-specs {
    background-color: #f8f8f8;
    padding: 12px;
    border-radius: 8px;
    margin-top: 16px;
  }
  
  ul {
    line-height: 1.35em;
    padding-left: 0;
    list-style: none;
    font-size: .9em;
    margin-bottom: 0;
    
    li {
      margin-bottom: 8px;
      
      strong {
        color: ${props => props.theme.color.$Dark};
      }
      
      .example {
        font-size: .9em;
        color: #999;
      }
      
      span {
        top: -2px;
        color: red;
        position: relative;
        font-size: 12px;
      }
    }
  }
`;
