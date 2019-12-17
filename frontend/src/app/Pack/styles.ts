import styled from 'styled-components';

export const ItemList = styled.div`
  .align-right {
    text-align: right;
  }
`;

export const PackWrapper = styled.div`
  h1 {
    color: ${props => props.theme.color.$darkBlue};
    font-weight: 700;
    font-size: 2.5rem;
    margin-bottom: 8px;
  }
  
  .edit-link {
    display: inline;
    font-size: .9rem;
    margin-left: 16px;
  }
  
  @media screen and (max-width: 660px) {
    h1 {
      font-size: 1.7rem;
    }
  }
`;

export const Credit = styled.div`
  font-family: "Open Sans", sans-serif;
  color: ${props => props.theme.color.$GrayBlue};
  font-weight: 600;
  font-size: .9rem;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 24px 0 8px;
`;

export const SectionTitle = styled.h3`
  display: inline-block;
  padding: 0 24px 8px 0;
  border-bottom: 2px dotted ${props => props.theme.color.$GrayBorder};
`;

export const TripDescription = styled.p`
    line-height: 1.65rem;
    font-size: 1rem;
    color: #555;
    white-space: pre-line;
`;

export const ItemName = styled.h4`
    font-family: "Open Sans", sans-serif;
    font-weight: 700;
    font-size: 1em;
    margin-bottom: 4px;
    color: ${props => props.theme.color.$darkBlue};
    
    span {
      color: #888;
      font-size: .9rem;
      margin-left: 8px;
    }
`;

export const ItemDescription = styled.p`
  font-size: .85em;
  color: #888;
  margin-bottom: 0;
  line-height: 1rem;
`;

export const ItemQuantity = styled(ItemDescription)``;

export const ItemNotes = styled.p`
  line-height: 1.35rem;
`;

export const ItemWeight = styled.p`
  margin: 4px 0 0;
  font-weight: 600;
`;

export const ItemsFooter = styled.div`
  padding: 16px 12px;
  background-color: ${props => props.theme.color.$lightGray};
  border-radius: 3px;
  display: flex;
  justify-content: flex-end;
`;

export const CategorySection = styled.div`
  .item-row {
    padding: 8px;
    border-bottom: 1px dashed #EEE;
  }
  
  .item-row:last-of-type {
    border-bottom: none;
  }
`;
