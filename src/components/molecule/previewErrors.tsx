import { FC } from 'react';
import styled from 'styled-components';

const StyledErrorContainer = styled.div`
  margin-top: 8px;
`;

const StyledErrorBody = styled.div`
  border: 1px solid #d5d5d5;
  border-radius: 4px;
  margin-top: 8px;
  height: 80px;
`;

export const PreviewError: FC<{}> = () => {
  return (
    <StyledErrorContainer>
      Error
      <StyledErrorBody />
    </StyledErrorContainer>
  );
};
