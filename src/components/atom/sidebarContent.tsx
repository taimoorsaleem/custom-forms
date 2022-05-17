import styled from 'styled-components';

export const StyledSideBarContent = styled.div`
  width: 250px;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #0d78fa;
  color: white;
  > div {
    margin-bottom: 24px;
    width: calc(100% - 40px);
  }
`;
