import { FC } from 'react';
import styled from 'styled-components';

const StyledEventContainer = styled.div`
  margin-top: 8px;
`;

const StyledEventBody = styled.div`
  border: 1px solid #d5d5d5;
  border-radius: 4px;
  margin-top: 8px;
  height: 80px;
`;

export const PreviewEvent: FC<any> = () => {
  return (
    <StyledEventContainer>
      Event
      <StyledEventBody />
    </StyledEventContainer>
  );
};
