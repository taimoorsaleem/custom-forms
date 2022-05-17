import { FC } from 'react';
import styled from 'styled-components';

const StyledDataBody = styled.div`
  border: 1px solid #d5d5d5;
  border-radius: 4px;
  margin-top: 8px;
  height: 120px;
  padding: 0 8px;
  max-width: 375px;
  overflow-y: auto;
`;

type Props = {
  values: any;
};

export const PreviewData: FC<Props> = ({ values }) => {
  return (
    <div>
      Data
      <StyledDataBody>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </StyledDataBody>
    </div>
  );
};
